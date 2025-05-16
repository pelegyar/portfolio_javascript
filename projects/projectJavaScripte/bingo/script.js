let board = [];
let remainingNumbers = [];

function getShuffledNumbers(max) {
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

function createBingoBoard() {
    const bingoBoard = document.getElementById("bingo-board");
    bingoBoard.innerHTML = "";
    board = getShuffledNumbers(75).slice(0, 25);
    remainingNumbers = getShuffledNumbers(75);

    board.forEach((number, i) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = number;
        cell.dataset.index = i;
        cell.dataset.number = number;
        bingoBoard.appendChild(cell);
    });

    document.getElementById("drawn-number").textContent = "";
    document.getElementById("play-again").style.display = "none";
    document.getElementById("draw-number").disabled = false;
}

function drawNumber() {
    if (remainingNumbers.length === 0) {
        alert("All numbers drawn!");
        return;
    }

    const index = Math.floor(Math.random() * remainingNumbers.length);
    const number = remainingNumbers.splice(index, 1)[0];
    document.getElementById("drawn-number").textContent = `Number drawn: ${number}`;

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        if (parseInt(cell.dataset.number) === number) {
            cell.classList.add("marked");
        }
    });

    if (checkBingo()) {
        alert("Bingo!");
        document.getElementById("draw-number").disabled = true;
        document.getElementById("play-again").style.display = "inline-block";
    }
}

function checkBingo() {
    const cells = document.querySelectorAll(".cell");
    const getMarked = index => cells[index].classList.contains("marked");


    for (let row = 0; row < 5; row++) {
        if ([0, 1, 2, 3, 4].every(i => getMarked(row * 5 + i))) return true;
    }


    for (let col = 0; col < 5; col++) {
        if ([0, 1, 2, 3, 4].every(i => getMarked(col + i * 5))) return true;
    }


    if ([0, 6, 12, 18, 24].every(getMarked)) return true;


    if ([4, 8, 12, 16, 20].every(getMarked)) return true;

    return false;
}

document.getElementById("draw-number").addEventListener("click", drawNumber);
document.getElementById("play-again").addEventListener("click", createBingoBoard);

createBingoBoard();
