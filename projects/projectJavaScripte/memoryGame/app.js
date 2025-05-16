'use strict';

const easy = 6;
const medium = 12;
const hard = 18;

const gameBoard = document.querySelector('.game-board');
const levelSpan = document.getElementById('level_span');
const easyButton = document.querySelector('#easyButton');
const mediumButton = document.querySelector('#mediumButton');
const hardButton = document.querySelector('#hardButton');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const winMessage = document.querySelector('.win-message');
const restartBtn = document.getElementById('restartBtn');

let selectedImages = [];
let flippedCards = [];
let lockBoard = false;
let moves = 0;
let timer = 0;
let timerInterval = null;
let currentLevel = easy;

easyButton.addEventListener('click', () => setLevel(easy));
mediumButton.addEventListener('click', () => setLevel(medium));
hardButton.addEventListener('click', () => setLevel(hard));
restartBtn.addEventListener('click', () => setLevel(currentLevel));

function setLevel(level) {
    currentLevel = level;
    levelSpan.innerText = level;
    winMessage.classList.add('hidden');
    resetStats();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    createBoard(level);
}

function resetStats() {
    moves = 0;
    timer = 0;
    flippedCards = [];
    movesDisplay.textContent = `Moves: ${moves}`;
    timerDisplay.textContent = `Time: ${timer}s`;
}

function updateTimer() {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
}

function createBoard(level) {
    gameBoard.innerHTML = '';
    selectedImages = [];

    for (let i = 0; i < level / 2; i++) {
        const imgUrl = `https://picsum.photos/200/300?random=${Date.now() + i}`;
        selectedImages.push({ id: i, url: imgUrl });
        selectedImages.push({ id: i, url: imgUrl });
    }

    shuffleArray(selectedImages);

    let columns = Math.ceil(Math.sqrt(level));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    selectedImages.forEach((imgObj, index) => {
        const container = document.createElement('div');
        container.classList.add('card-container');
        container.dataset.id = imgObj.id;
        container.dataset.index = index;

        const inner = document.createElement('div');
        inner.classList.add('card-inner');

        const front = document.createElement('img');
        front.classList.add('card-front');
        front.src = imgObj.url;

        const back = document.createElement('img');
        back.classList.add('card-back');
        back.src = 'https://via.placeholder.com/100x150?text=?';

        inner.appendChild(front);
        inner.appendChild(back);
        container.appendChild(inner);
        container.addEventListener('click', handleCardClick);
        gameBoard.appendChild(container);
    });
}

function handleCardClick(e) {
    const container = e.currentTarget;
    if (lockBoard || container.classList.contains('flip')) return;

    container.classList.add('flip');
    flippedCards.push(container);

    if (flippedCards.length === 2) {
        lockBoard = true;
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.id === card2.dataset.id) {
        card1.removeEventListener('click', handleCardClick);
        card2.removeEventListener('click', handleCardClick);
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }

    flippedCards = [];
    lockBoard = false;
    checkWin();
}

function checkWin() {
    const flipped = document.querySelectorAll('.card-container.flip');
    if (flipped.length === currentLevel) {
        clearInterval(timerInterval);
        setTimeout(() => winMessage.classList.remove('hidden'), 500);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
