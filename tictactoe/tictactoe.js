const squares = document.querySelectorAll("td");
const restartBtn = document.querySelector("#restartBtn");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let winner = "";
let move = 0;
statusText.innerHTML = "Next move: " + currentPlayer;
let gameEnd = false;

//Funksjon som starter spillet på nytt
function restartGame() {
    squares.forEach((square) => {
        square.textContent = "";
        square.style.backgroundColor = "";
    });
    gameEnd = false;
    move = 0;
    currentPlayer = "X";
    winner = "";
    statusText.innerHTML = "Next move: " + currentPlayer;
}

//funksjon som sjekker om noen har vunnet
function checkWin() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
            squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer
        ) {
            squares[a].style.backgroundColor = "green";
            squares[b].style.backgroundColor = "green";
            squares[c].style.backgroundColor = "green";
            winner = currentPlayer;
            scoreCounter()
            gameEnd = true;
            return;
        }
      }
}

function scoreCounter() {

    if (isNaN(localStorage.scoreCountX)) {
        localStorage.scoreCountX = 0
    }
    if (isNaN(localStorage.scoreCountO)) {
        localStorage.scoreCountO = 0
    }
    if (isNaN(localStorage.scoreCountDraw)) {
        localStorage.scoreCountDraw = 0
    }

    if (winner != "") {
        if (winner === "X") {
            localStorage.scoreCountX = Number(localStorage.scoreCountX)+1;
        } else if (winner === "O") {
            localStorage.scoreCountO = Number(localStorage.scoreCountO)+1;
        } else if (winner === "draw") {
            localStorage.scoreCountDraw = Number(localStorage.scoreCountDraw)+1;
        }
    }

    document.getElementById("xScore").innerHTML = "X wins: " + localStorage.scoreCountX;
    document.getElementById("oScore").innerHTML = "O wins: " + localStorage.scoreCountO;
    document.getElementById("drawScore").innerHTML = "Draw: " + localStorage.scoreCountDraw;
    return;
}



//Funksjon som sier hva som skal skje når en firkant trykkes på
function handleSquareClick(e) {
    move += 1;
    const square = e.target;
    if (square.textContent !== "" || gameEnd) {
        //Ignorer klikk hvis ruten allerede er klikket på
        return;
    }
    square.textContent = currentPlayer;
    checkWin();
    if (winner != "") {
        statusText.innerHTML = "Winner: " + winner;
    } else {
        currentPlayer = currentPlayer === "X" ? "O": "X";
        statusText.innerHTML = "Next move: " + currentPlayer;
    }
    if (gameEnd == false && move === 9) {
        winner = "draw";
        scoreCounter();
        gameEnd = true;
        statusText.innerHTML = "Draw";
    }
}

//Legg til en EventListener på knappene/firkantene så de kan trykkes på
squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
});

restartBtn.addEventListener("click", restartGame)