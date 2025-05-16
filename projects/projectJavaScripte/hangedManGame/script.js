document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);
});

const words = [
    "javascript", "hangman", "developer", "programming", "function",
    "variable", "object", "array", "string", "boolean",
    "undefined", "null", "loop", "while", "for",
    "const", "let", "html", "css", "react",
    "node", "express", "backend", "frontend", "database",
    "debug", "git", "github", "algorithm", "compile"
];

let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
const maxWrong = 12;

const wordDisplay = document.getElementById("word");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");
const parts = document.querySelectorAll(".part");

function pickWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function updateWrongLetters() {
    wrongLettersDisplay.textContent = wrongLetters.join(" ");


    parts.forEach((part, index) => {
        if (index < wrongLetters.length + 1) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });
}

function checkWinOrLose() {
    const uniqueLetters = [...new Set(selectedWord.split(""))];

    if (correctLetters.length === uniqueLetters.length) {
        message.textContent = "You Win! 🎉";
        document.removeEventListener("keydown", handleKeyPress);
        playAgainBtn.style.display = "inline-block";
    }

    if (wrongLetters.length >= maxWrong) {
        message.textContent = `You Lose! The word was "${selectedWord}" 😢`;
        document.removeEventListener("keydown", handleKeyPress);
        playAgainBtn.style.display = "inline-block";
    }
}

function handleKeyPress(e) {
    const letter = e.key.toLowerCase();
    if (letter.match(/^[a-z]$/i)) {
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
        checkWinOrLose();
    }
}

function startGame() {
    correctLetters = [];
    wrongLetters = [];
    pickWord();
    displayWord();
    updateWrongLetters();
    message.textContent = "";
    playAgainBtn.style.display = "none";
    parts.forEach(part => (part.style.display = "none"));
    document.addEventListener("keydown", handleKeyPress);
}

playAgainBtn.addEventListener("click", startGame);

startGame();
