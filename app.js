document.addEventListener("DOMContentLoaded", () => {
    //이 밑으로 작성되는 코드는 모두 이벤트 리스너의 내용(람다식)
    const girdDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const resultDisplay = document.querySelector("#result");
    const width = 4;
    let squares = [];
    let score = 0

    //플레잉 보드 만들기 그리드에 사각형 생성하기.
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement("div");
            square.innerHTML = 0;
            girdDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate(); //?? 초기에 숫자 두개로 시작하는건 그냥 함수를 두번 호출하면 된다.
    }
    createBoard();

    //랜덤 숫자 만들기
    function generate() {
        //random()은 0~1사이의 무작위 난수를 생성. *로 최대 값, +로 최소 값 설정 가능 
        //비어있는 square를 찾기 위한 변수 및 조건문
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        } else {
            generate();
        }
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) { //2차원 배열 만들기.
                //세로를 기준으로 가로 0 1 2 3 추출)
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                //가로 (세로에서 접근한 배열을 원소로 갖는 배열)
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                //filter는 해당 배열에서 삭제가 아닌, 제외한 새로운 배열을 만드는 것
                //람다식에 아무것도 적지 않으면 0 undefind null이 필터링된다.
                let filteredRow = row.filter(num => num);

                //하드코딩 하셨지만.. 나는 칸수도 늘릴 생각이라서.
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);

                //필터링 배열과 0배열 연결하기
                // 0 배열 + 필터링 배열을 붙여 우측으로 정렬
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    //swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);

                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);

                //필터링 배열 + 0 배열을 붙여 좌측으로 정렬
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    //swipe down
    function moveDown() {
        //가로줄을 기준으로 세로줄 추출. 한번 돌 때 마다 1 2 3 4 < 이 각각의 세로줄의 배열 추출
        for (let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newCoulmn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newCoulmn[0];
            squares[i + width].innerHTML = newCoulmn[1];
            squares[i + width * 2].innerHTML = newCoulmn[2];
            squares[i + width * 3].innerHTML = newCoulmn[3];
        }
    }

    //swipe up
    function moveUp() {
        //가로줄을 기준으로 세로줄 추출. 한번 돌 때 마다 1 2 3 4 < 이 각각의 세로줄의 배열 추출
        for (let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newCoulmn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newCoulmn[0];
            squares[i + width].innerHTML = newCoulmn[1];
            squares[i + width * 2].innerHTML = newCoulmn[2];
            squares[i + width * 3].innerHTML = newCoulmn[3];
        }
    }



    //가로로 연속된 블럭이 같은 숫자를 가진다면 결합하는 조건문
    function combineRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i + 1].innerHTML = 0;
                score += combineTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }


    //세로로 연속된 블럭이 같은 숫자를 가진다면 결합하는 조건문
    function combineColumn() {
        for (let i = 0; i < (width * width) - width; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }


    //키코드
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }


    //승리 확인하기
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === 2048) {
                resultDisplay.innerHTML = "You Win!"
                document.removeEventListener('keyup', control)
            }
        }
    }


    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = "You Lose!";
            document.removeEventListener('keyup', control)
        }
    }
})