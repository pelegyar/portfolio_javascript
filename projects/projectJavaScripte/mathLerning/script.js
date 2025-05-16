let score = 0;
let currentQuestion = 0;
let correctAnswer = 0;
let timeLeft = 30;
let timerInterval;
const totalQuestions = 5;

function generateQuestion() {
    if (currentQuestion >= totalQuestions) {
        document.getElementById("question-box").style.display = "none";
        document.getElementById("feedback").textContent = `Quiz complete! Your score: ${score} out of ${totalQuestions}.`;
        clearInterval(timerInterval);
        return;
    }

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const operations = ["*", "/"];
    const op = operations[Math.floor(Math.random() * operations.length)];

    if (op === "*") {
        correctAnswer = num1 * num2;
        document.getElementById("question").textContent = `${num1} * ${num2}`;
    } else {
        correctAnswer = num1;
        document.getElementById("question").textContent = `${num1 * num2} ÷ ${num2}`;
    }

    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
    startTimer();
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById("answer").value);
    clearInterval(timerInterval);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        document.getElementById("feedback").textContent = `Wrong. Correct answer was ${correctAnswer}.`;
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    currentQuestion++;
    setTimeout(generateQuestion, 1500);
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("feedback").textContent = `Time's up! Correct answer was ${correctAnswer}.`;
            currentQuestion++;
            setTimeout(generateQuestion, 1500);
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    currentQuestion = 0;
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("feedback").textContent = "";
    document.getElementById("question-box").style.display = "block";
    clearInterval(timerInterval);
    generateQuestion();
}

generateQuestion();
