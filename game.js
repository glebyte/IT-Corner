//---------------
// IT TRIVIA GAME
//---------------

// Game Settings
const QUESTION_TIME = 30; // Time allowed to answer each question (seconds)
const QUESTIONS_PER_GAME = 10; // Number of questions per game

//  QUESTION BANK: Stores all trivia questions and pertaining information
const questions = [

    {
        question: "What does CPU stand for?",
        answers: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        correct: "Central Processing Unit"
    },

    {
        question: "What does RAM stand for?",
        answers: [
            "Read Access Memory",
            "Random Access Memory",
            "Run Active Memory",
            "Remote Access Module"
        ],
        correct: "Random Access Memory"
    },

    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyper Transfer Machine Language"
        ],
        correct: "Hyper Text Markup Language"
    },

    {
        question: "Which device is used to connect different networks?",
        answers: [
            "Monitor",
            "Router",
            "Keyboard",
            "Printer"
        ],
        correct: "Router"
    },

    {
        question: "What does IP stand for?",
        answers: [
            "Internet Protocol",
            "Internal Program",
            "Information Process",
            "Internet Provider"
        ],
        correct: "Internet Protocol"
    },

    {
        question: "What will accomplish a specific task for the user?",
        answers: [
            "Driver",
            "Application",
            "Operating system",
            "Filesystem"
        ],
        correct: "Application"
    },

     {
        question: "Who developed Python?",
        answers: [
            "Dennis Ritchie",
            "Guido van Rossum",
            "Alan Turing",
            "James Gosling"
        ],
        correct: "Guido van Rossum"
    },

    {
        question: "How are text values (strings) typically represented in code?",
        answers: [
            "100",
            "False",
            "\"Coding is fun!\"",
            "9.99"
        ],
        correct: "\"Coding is fun!\""
    },

    {
        question: "Which language can a computer's CPU understand directly without any translation?",
        answers: [
            "Python",
            "Assembly language",
            "Machine language",
            "HTML"
        ],
        correct: "Machine language"
    },

    {
        question: "The physical layer of the OSI (Open Systems Interconnection) model is also known as:",
        answers: [
            "Layer 1",
            "Layer 2",
            "Layer 3",
            "Layer 4"
        ],
        correct: "Layer 1"
    },

    {
        question: "Which protocol is specifically designed for transferring files between a client and a server over a network?",
        answers: [
            "HTTP",
            "DNS",
            "FTP",
            "ICMP"
        ],
        correct: "FTP"
    },

    {
        question: "How many layers make up the OSI (Open Systems Interconnection) model?",
        answers: [
            "4 layers",
            "7 layers",
            "5 layers",
            "8 layers"
        ],
        correct: "7 layers"
    },

    {
        question: "On which port does FTP run by default?",
        answers: [
            "21",
            "25",
            "53",
            "80"
        ],
        correct: "21"
    },

    {
        question: "Which of the following is an example of application software?",
        answers: [
            "Operating System (OS)",
            "Low-level firmware",
            "Web browser",
            "Utility software"
        ],
        correct: "Web browser"
    },

    {
        question: "Which internal hardware component connects a computer's main parts and is often called its \"backbone\"?",
        answers: [
            "Hard drive",
            "Motherboard",
            "Power supply",
            "CPU"
        ],
        correct: "Motherboard"
    },

    {
        question: "What temporary computer memory holds data currently in use but clears completely when the power is turned off?",
        answers: [
            "ROM",
            "SSD",
            "RAM",
            "Flash drive"
        ],
        correct: "RAM"
    },

    {
        question: "What hardware component is responsible for converting alternating current (AC) from a wall outlet into low-voltage direct current (DC) power for a PC?",
        answers: [
            "CPU",
            "GPU",
            "PSU",
            "RAM"
        ],
        correct: "PSU"
    },

    {
        question: "Which protocol is used to securely browse websites?",
        answers: [
            "HTTP",
            "FTP",
            "SMTP",
            "HTTPS"
        ],
        correct: "HTTPS"
    },

    {
        question: "Which component is considered the \"brain\" of the computer, responsible for executing instructions and processing data?",
        answers: [
            "RAM",
            "CPU",
            "PSU",
            "GPU"
        ],
        correct: "CPU"
    },

    {
        question: "Which of the folllowing best describes a hard drive?",
        answers: [
            "Storage",
            "Input",
            "Processing",
            "Output"
        ],
        correct: "Storage"
    }


];


// GAME VARIABLES

let shuffledQuestions = []; // Stores randomly selected questions
let currentQuestion = 0; // Tracks current question number
let score = 0; // Stores the player's score
let timeLeft = QUESTION_TIME; // Tracks the remaining time for each question
let timerInterval = null; // Stores timer interval so it can be stopped
let hasAnswered = false; // Prevents players from answering the same question twice



// HTML ELEMENTS: Connects JS to HTML elements using their IDs and class

const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answer-buttons");

const timerElement =
    document.getElementById("timer");

const timerContainer =
    document.querySelector(".timer-container");

const progressElement =
    document.getElementById("progress");

// SHUFFLE ARRAY: Randomises the order of questions and answers to make each game different
function shuffleArray(array) {

    const shuffled = [...array]; // Copies the array so the orginal order is preserved
    // Loops backward through the array to randomly swap items
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Generate a random index
        const j = Math.floor(Math.random() * (i + 1));
        //Swaps the two items to change their positions in the array
        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled; // Returns the shuffled array
}


// START GAME
// Starts new game by resetting previous game and selecting new set of random questions 

function startGame() {

    clearInterval(timerInterval); // Stops existing timer

    currentQuestion = 0; // Resets the question counter so game starts from the first question
    score = 0; // Resets the player's score for new game

    // Shuffles question bank to randomly select 10 questions
    shuffledQuestions = shuffleArray(questions)
        .slice(0, QUESTIONS_PER_GAME);

    timerContainer.style.display = "block"; // Make timer visible when new game starts

    showQuestion(); // Displays the first question

}

// DISPLAY QUESTION: Displays the current question and its answer choices
function showQuestion() {

    clearInterval(timerInterval); // Stops the previous question's timer before displaying a new one
    hasAnswered = false; // Resets the answer status to allow the player to answer the new question


    const question = shuffledQuestions[currentQuestion]; // Gets the current question

    questionElement.textContent = question.question; // Displays the question text

    // Updates the progress indicator to show the current question number
    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;

    answerButtons.innerHTML = ""; // Removes the previous question's answers and feedback

    // Randomize answer choices
    const shuffledAnswers = shuffleArray(question.answers);
    // Creates a separate clickable button for each answer choice.
    shuffledAnswers.forEach(answer => {

        const button = document.createElement("button"); // Creates a new answer button

        button.textContent = answer; // Displays the answer text inside the button

        button.classList.add("answer-button"); // Applies the CSS styling to the answer button

        // Checks the selected answer when the player clicks the button
        button.addEventListener("click", () => {
            checkAnswer(answer);
        });

        answerButtons.appendChild(button); // Adds the answer button to the webpage

    });

    startTimer(); // Starts a new countdown for the current question

}


// COUNTDOWN TIMER: Gives the player 30 seconds to answer each question
// Updates the timer every second and automatically ends the question when time runs out
function startTimer() {

    clearInterval(timerInterval); // Clears any existing timer

    timeLeft = QUESTION_TIME; // Resets the countdown to 30 seconds

    timerElement.textContent = timeLeft; // Displays the starting time
    // Runs the countdown function every second 
    timerInterval = setInterval(() => {

        timeLeft--; // Decreases the remaining time by one second

        timerElement.textContent = timeLeft; // Updates the timer displayed to the player
        // Checks whether the player has run out of time
        if (timeLeft <= 0) { 

            clearInterval(timerInterval); // Stops the countdown when it reaches zero

            finishQuestion(null); // Ends the question without a selected answer

        }

    }, 1000);

}


// CHECK ANSWER:
// Checks the player's selected answer against the correct answer
// Updates the score if the answer is correct and finishes the question

function checkAnswer(selectedAnswer) {

    if (hasAnswered) return;

    const question = shuffledQuestions[currentQuestion]; // Gets the correct answer for the current question

    if (selectedAnswer === question.correct) { // Checks whether the selected answer is correct

        score++; // Adds one point to the player's score

    }

    finishQuestion(selectedAnswer); // Ends the question and passes the selected answer for feedback

}


// FINISH QUESTION:
// Ends the current question, stops the timer and prevents further answers.
// Highlights the correct answer and displays feedback before allowing the player to continue.
function finishQuestion(selectedAnswer) {

    if (hasAnswered) return; // Prevents this function from running more than once

    hasAnswered = true; // Marks the question as answered

    clearInterval(timerInterval); // Stops the countdown timer

    const question = shuffledQuestions[currentQuestion];

    const buttons =
        answerButtons.querySelectorAll("button"); // Selects all answer buttons

    // Disable all answer buttons and highlights the correct and incorrect answers
    buttons.forEach(button => {

        button.disabled = true; // Prevents further clicks

        // Highlight correct answer
        if (button.textContent === question.correct) {

            button.style.backgroundColor = "#0ae20a";

        }

        // Highlight incorrect selected answer
        if (
            selectedAnswer !== null &&
            button.textContent === selectedAnswer &&
            selectedAnswer !== question.correct
        ) {

            button.style.backgroundColor = "#FF7F7F";

        }

    });


    // Display feedback
    const feedback = document.createElement("p");

    if (selectedAnswer === null) { // Checks whether the player ran out of time

        feedback.textContent = "Time's up!";

    } else if (selectedAnswer === question.correct) {  // Checks for a correct answer

        feedback.textContent = "Correct!";

    } else {

        feedback.textContent = "Incorrect!";

    }

    answerButtons.appendChild(feedback); // Displays the feedback message


    // Next Question Button
    const nextButton = document.createElement("button");
    // Changes the button text depending on whether this is the final question
    nextButton.textContent =
        currentQuestion === shuffledQuestions.length - 1
            ? "View Results"
            : "Next Question";

    nextButton.classList.add("answer-button");

    nextButton.addEventListener("click", nextQuestion); // Moves to the next question when clicked

    answerButtons.appendChild(nextButton);

}

// NEXT QUESTION
function nextQuestion() {

    currentQuestion++; // Increments question

    if (currentQuestion < shuffledQuestions.length) { // Checks if more questions remain

        showQuestion(); // Displays the next question

    } else {

        showResults(); // Displays the final results when all questions are complete

    }

}

// DISPLAY FINAL RESULTS
function showResults() {

    clearInterval(timerInterval); // Stops the timer when the game ends

    // Hide timer
    timerContainer.style.display = "none";

    // Calculates the final score as a percentage and rounds it to a whole number
    const percentage =
        Math.round((score / shuffledQuestions.length) * 100);

    // Score feedback
    let message;

    // Selects a feedback message based on the player's final score
    if (score === shuffledQuestions.length) {

    message = "Perfect Score!";

} else if (percentage >= 80) {

    message = "Great Job!";

} else if (percentage >= 60) {

    message = "Good Effort!";

} else if (percentage >= 40) {

    message = "Nice Try!";

} else {

    message = "Keep Practicing!";

}


    // Display results
    questionElement.textContent = "Trivia Complete!";

    progressElement.textContent = "Game Over";

    // Displays the final score, percentage and message
    answerButtons.innerHTML = `
        <h3>Your final score: ${score} / ${shuffledQuestions.length}</h3>

        <p>Score percentage: ${percentage}%</p>

        <p>${message}</p>
    `;


    // Play Again Button
    const restartButton = document.createElement("button");

    restartButton.textContent = "Play Again";

    restartButton.classList.add("answer-button");

    restartButton.addEventListener("click", startGame); // Starts a new game when clicked

    answerButtons.appendChild(restartButton); 

}

// INITIALIZE GAME
// Automatically starts the game when the JavaScript file loads
startGame();
