document.addEventListener("DOMContentLoaded", () => {
    //이 밑으로 작성되는 코드는 모두 이벤트 리스너의 내용(람다식)
    const girdDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const resultDisplay = document.querySelector("#result");
    const width = 4;
    let squares = [];

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
        } else {
            generate();
        }
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) { //2차원 배열 만들기.
                //세로 (무조건 첫번째를 기준으로 가로로 0 1 2 3 추출)
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

    //연속된 블럭이 같은 숫자를 가진다면 결합하는 조건문
    function combineRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i + 1].innerHTML = 0;
            }
        }

    }

    //키코드
    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
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
})