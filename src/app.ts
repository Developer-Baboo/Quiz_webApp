// Login(index.html file) Code start here
try {
    const users: { email: string, password: string }[] = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
    { email: "user3@example.com", password: "password3" },
    { email: "user4@example.com", password: "password4" }
];

const loginForm = document.getElementById("loginForm") as HTMLFormElement;

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const email = emailInput.value;
    const password = passwordInput.value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful!");
        window.location.href = "instructions.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
// Login(index.html file) code end here

}
catch(error)
{
    console.log(error);
}
//instructions
const startButton = document.getElementById("startButton");
if (startButton) {
    startButton.addEventListener("click", () => {
        window.location.href = "quiz.html"; // Navigate to quiz.html when Start Quiz button is pressed
    });
}
// instructions

// Interface defining the structure of an answer
interface Answer {
    text: string;
    correct: boolean;
}

// Interface defining the structure of a question, containing question text and an array of answers

interface Question {
    question: string;
    answers: Answer[];
}

// Array of question objects
const questions: Question[] = [
            {
                question: "What does HTML stand for?",
                answers: [
                    {text: "Hyperlink Text Markup Language", correct: false},
                    {text: "Hyper Transfer Markup Language", correct: false},
                    {text: "Hyper Text Markup Language", correct: true},
                    {text: "Hyperlink Transfer Markup Language", correct: false}
                ]
            },
            {
                question: "What is the correct HTML element for the largest heading?",
                answers: [
                    {text: "h6", correct: false},
                    {text: "heading", correct: false},
                    {text: "h1", correct: true},
                    {text: "head", correct: false}
                ]
            },
            {
                question: "Which attribute is used to define inline styles in HTML?",
                answers: [
                    {text: "class", correct: false},
                    {text: "styles", correct: false},
                    {text: "css", correct: false},
                    {text: "style", correct: true}
                ]
            },
            {
                question: "What does the anchor tag do in HTML?",
                answers: [
                    {text: "Defines a paragraph", correct: false},
                    {text: "Defines a hyperlink", correct: true},
                    {text: "Defines a line break", correct: false},
                    {text: "Defines an image", correct: false}
                ]
            },
            {
                question: "Which tag is used for creating a table in HTML?",
                answers: [
                    {text: "table", correct: true},
                    {text: "tr", correct: false},
                    {text: "td", correct: false},
                    {text: "th", correct: false}
                ]
            },
            {
                question: "In HTML, what does the br tag represent?",
                answers: [
                    {text: "Breaks the current line and continues on the next line", correct: true},
                    {text: "Defines a bold text", correct: false},
                    {text: "Defines a block of code", correct: false},
                    {text: "Defines a bullet point", correct: false}
                ]
            },
            {
                question: "Which HTML element is used to define important text?",
                answers: [
                    {text: "strong", correct: true},
                    {text: "em", correct: false},
                    {text: "bold", correct: false},
                    {text: "important", correct: false}
                ]
            },
            {
                question: "What does CSS stand for?",
                answers: [
                    {text: "Computer Style Sheets", correct: false},
                    {text: "Colorful Style Sheets", correct: false},
                    {text: "Creative Style Sheets", correct: false},
                    {text: "Cascading Style Sheets", correct: true}
                ]
            },
            {
                question: "Which is used to create Web Pages ?",
                answers: [
                    {text: "C++", correct: false},
                    {text: "Java", correct: false},
                    {text: "JVM", correct: false},
                    {text: "HTML", correct: true}
                ]
            },
            {
                question: "Who is the founder of Html?",
                answers: [
                    {text: "Yeans", correct: false},
                    {text: "Google", correct: false},
                    {text: "Maxwell", correct: false},
                    {text: "Timer Berns", correct: true}
                ]
            },
            
        ];


// Get HTML elements by their IDs
const questionElement: HTMLElement | null = document.getElementById("question");
const answerButtons: HTMLElement | null = document.getElementById("answer-buttons");
const nextButton: HTMLElement | null = document.getElementById("next-btn");

let currentQuestionIndex: number = 0;
let score: number = 0;


// Function to start the quiz by resetting the question index and score, and showing the first question
function startQuiz(): void {
    currentQuestionIndex = 0;
    score = 0;
    if (nextButton) {
        nextButton.innerHTML = "Next";
    }
    showQuestion();
}

// Function to display the current question and its answer choices
function showQuestion(): void {
    resetState(); // Reset the state (remove previous question and answer choices)
    const currentQuestion: Question | undefined = questions[currentQuestionIndex]; // Get the current question object
    if (currentQuestion) {
        const questionNo: number = currentQuestionIndex + 1; // Calculate the question number
        if (questionElement) {
            questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`; // Display the question text
        }

      if (answerButtons) {
          // Loop through answer choices and create buttons for each answer
            currentQuestion.answers.forEach((answer: Answer) => {
                const button: HTMLButtonElement = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButtons.appendChild(button);

                if (answer.correct) {
                    button.dataset.correct = answer.correct.toString();
                }

                button.addEventListener("click", selectAnswer);
            });
        }
    }
}

// Function to reset the question and answer choices
function resetState(): void {
    if (nextButton) {
        nextButton.style.display = "none";
    }
    if (answerButtons) {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
}

// Function to handle the user's answer selection
function selectAnswer(e: Event): void {
    const selectedBtn: HTMLButtonElement = e.target as HTMLButtonElement;
    const isCorrect: boolean = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    if (answerButtons) {
        Array.from(answerButtons.children).forEach((button: Element) => {
            if (button instanceof HTMLButtonElement && button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.setAttribute("disabled", "true");
        });
    }

    if (nextButton) {
        nextButton.style.display = "block";
    }
}

// Function to display the user's score and offer the option to play again
function showScore(): void {
    resetState();
    if (questionElement) {
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    }
    if (nextButton) {
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
}

// Function to handle the Next button click, showing the next question or the final score
function handleNextButton(): void {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for the Next button click
if (nextButton) {
    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });
}


//Start Quiz When Page Loads
startQuiz();










