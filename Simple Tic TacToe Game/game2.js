const cells = document.querySelectorAll(".cell");
const messageText = document.querySelector("#messageText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let choices = ["", "", "", "", "", "", "", "", ""];

let firstPlayer = "X";
let executing = false;

startGame();

function startGame() {
    cells.forEach(function (cell) {
        cell.addEventListener("click", cellTouched);
    });
    
    restartBtn.addEventListener("click", startGameAgain);
    messageText.textContent = `${firstPlayer}'s turn!`;
    executing = true;
}

function cellTouched() {
    const cellId = this.getAttribute("cellId");

    if (choices[cellId] != "" || !executing) {
        return;
    }
    updateCell(this, cellId);
    verifyWinner();

}

function updateCell(cell, index) {
    choices[index] = firstPlayer;
    cell.textContent = firstPlayer;
}

function nextPlayer() {
    firstPlayer = (firstPlayer == "X") ? "O" : "X";
    messageText.textContent = `${firstPlayer}'s turn!`;
}

function verifyWinner() {
    let winner = false;

    for (let i = 0; i < winConditions.length; i++) {
        const way = winConditions[i];
        const cellA = choices[way[0]];  
        const cellB = choices[way[1]];
        const cellC = choices[way[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            winner = true;
            break;
        }
    }

    if (winner) {
        messageText.textContent = `${firstPlayer}'s wins!`;
        executing = false;
    }

    else if (!choices.includes("")) {
        messageText.textContent = `Draw!`;

    }
    else {
        nextPlayer();
    }
}

function startGameAgain() {
    firstPlayer = "X";
    choices = ["", "", "", "", "", "", "", "", ""];
    messageText.textContent = `${firstPlayer}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    executing = true;
}