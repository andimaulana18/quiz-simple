const questions = [
    {
        question: "Berapa hasil dari 5 * 5",
        answers: [
            {text: "24", correct: false},
            {text: "25", correct: true},
            {text: "26", correct: false},
            {text: "27", correct: false},
        ]
    },
    {
        question: "Berapa hasil dari 4 * 5",
        answers: [
            {text: "20", correct: true},
            {text: "21", correct: false},
            {text: "19", correct: false},
            {text: "22", correct: false},
        ]
    },
    {
        question: "Berapa hasil dari 6 * 5",
        answers: [
            {text: "31", correct: false},
            {text: "28", correct: false},
            {text: "29", correct: false},
            {text: "30", correct: true},
        ]
    },
    {
        question: "Berapa hasil dari 4 * 4",
        answers: [
            {text: "16", correct: true},
            {text: "21", correct: false},
            {text: "19", correct: false},
            {text: "22", correct: false},
        ]
    },
    {
        question: "Berapa hasil dari 6 * 6",
        answers: [
            {text: "35", correct: false},
            {text: "34", correct: false},
            {text: "36", correct: true},
            {text: "37", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(params) {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(params) {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(params) {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(params) {
    resetState();
    questionElement.innerHTML = ` Hasil Benar nya hanya ${score} dari ${questions.length} Soal!`;
    nextButton.innerHTML  = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(params) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();