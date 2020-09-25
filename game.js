const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [
  {
    question:
      'Who said "injustice anywhere is a threat to justice everywhere"?',
    choice1: "Maya Angelou",
    choice2: "Martin Luther King Jr.",
    choice3: "Alice Walker",
    choice4: "Nelson Mandela",
    answer: 2,
  },
  {
    question: "Who was the first black football player to captain England?",
    choice1: "Steve Kagawa",
    choice2: "John Rooney",
    choice3: "Paul Ince",
    choice4: "Ashley Cole",
    answer: 3,
  },
  {
    question: "What led to the 1963 Bristol bus boycott?",
    choice1:
      "Rosa Parks being arrested for refusing to give up her seat for a white person.",
    choice2:
      "An 18 year old boy being told by a manager 'We don't employ black people'.",
    choice3: "The toppling of the Colston statue.",
    choice4: "The company refused to pay their fair share of taxes.",
    answer: 2,
  },
  {
    question:
      "What year was Naomi Campbell first on the magazine cover of French Vogue?",
    choice1: "1988",
    choice2: "2005",
    choice3: "1978",
    choice4: "2001",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    window.location.href = "end.html";
  }

  questionCounter++;
  progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //this calculates what question we are on and then corresponds that with the precentage we are currently at

  const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionsIndex];
  question.innerText = currentQuestion.question; //based on the question we are on, it'll know what question to ask next

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  avaliableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
