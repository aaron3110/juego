const questions = [
    {
        question: "¿Qué principio fundamental garantiza la igualdad de todos los ciudadanos ante la ley?",
        options: ["Estado de derecho", "Monarquía", "Dictadura", "Anarquía"],
        correct: "Estado de derecho"
    },
    {
        question: "¿Cuál es el órgano encargado de crear y modificar las leyes en una democracia?",
        options: ["El Congreso", "El Poder Ejecutivo", "El Poder Judicial", "La Policía"],
        correct: "El Congreso"
    },
    {
        question: "¿Qué derecho fundamental permite a los ciudadanos elegir a sus representantes?",
        options: ["Sufragio", "Libertad de expresión", "Derecho a la privacidad", "Derecho a la educación"],
        correct: "Sufragio"
    },
    {
        question: "¿Cuál es la función principal del Poder Judicial en una democracia?",
        options: ["Interpretar y aplicar las leyes", "Crear leyes", "Ejecutar políticas públicas", "Recaudar impuestos"],
        correct: "Interpretar y aplicar las leyes"
    },
    {
        question: "¿Qué mecanismo permite a los ciudadanos participar directamente en la toma de decisiones políticas?",
        options: ["Referéndum", "Decreto", "Ley marcial", "Censura"],
        correct: "Referéndum"
    }
];

let shuffledQuestions = [];
let questionsAnswered = 0;
const totalQuestions = questions.length;
let score = 0;
let currentQuestion;
let timer;
let timeLeft = 15;

const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const resultContainer = document.getElementById("result");
const scoreContainer = document.getElementById("score");
const timerElement = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const fetchQuestion = () => {
    if (shuffledQuestions.length === 0) {
        shuffledQuestions = [...questions];
        shuffleArray(shuffledQuestions);
    }
    return shuffledQuestions.pop();
};

const displayQuestion = () => {
    if (questionsAnswered >= totalQuestions) {
        displayFinalScore();
        return;
    }

    resultContainer.textContent = "";
    choicesContainer.innerHTML = "";
    currentQuestion = fetchQuestion();
    questionElement.textContent = currentQuestion.question;
    
    const choices = currentQuestion.options;
    shuffleArray(choices);

    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => handleAnswer(choice, button));
        choicesContainer.appendChild(button);
    });

    resetTimer();
};

const resetTimer = () => {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerElement.style.color = "black"; // Reset timer color to black
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.style.color = "red"; // Change timer color to red when time is up
            handleAnswer(null, null); // Handle timeout as incorrect answer
        }
    }, 1000);
};

const handleAnswer = (choice, button) => {
    clearInterval(timer); // Stop the timer when an answer is selected or time runs out
    const buttons = choicesContainer.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.correct) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    }

    if (choice !== null) {
        if (choice === currentQuestion.correct) {
            button.classList.add("correct");
            resultContainer.textContent = "¡Correcto!";
            score += 10; // Incrementar la puntuación
        } else {
            button.classList.add("incorrect");
            resultContainer.textContent = `Incorrecto. Suerte en la siguiente pregunta :DDD`;
        }
    } else {
        resultContainer.textContent = `Tiempo agotado. Suerte en la próxima :D`;
    }

    scoreContainer.textContent = `Puntuación: ${score}`;
    questionsAnswered++;
    if (questionsAnswered >= totalQuestions) {
        setTimeout(displayFinalScore, 2000); // Wait 2 seconds before showing the final score
    } else {
        setTimeout(displayQuestion, 2000); // Wait 2 seconds before showing the next question
    }
};

const displayFinalScore = () => {
    questionContainer.innerHTML = `
        <h2>Haz terminadoo :D</h2>
        <p>Tu puntuación final es: ${score}</p>
    `;
};

displayQuestion(); // Display the first question when the page loads