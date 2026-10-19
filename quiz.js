// quiz.js: load questions with fetch, show them, calculate the score

const QUIZ_SCORE_KEY = "quizScore";

const currentUser = requireLogin(); // redirects to login if not logged in

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const loadingEl = document.getElementById("loading");
const loadErrorEl = document.getElementById("loadError");
const quizBox = document.getElementById("quizBox");
const questionNumberEl = document.getElementById("questionNumber");
const progressTextEl = document.getElementById("progressText");
const progressBarEl = document.getElementById("progressBar");
const questionTextEl = document.getElementById("questionText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ---------- Load questions (Fetch API) ---------- */

async function loadQuestions() {
  try {
    const response = await fetch("data/questions.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    questions = await response.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("The questions file is empty.");
    }

    loadingEl.classList.add("d-none");
    quizBox.classList.remove("d-none");
    showQuestion();
  } catch (error) {
    loadingEl.classList.add("d-none");
    loadErrorEl.classList.remove("d-none");
    loadErrorEl.textContent =
      "Sorry, the questions could not be loaded. Please open the project with Live Server and refresh the page.";
    console.error("Fetch error:", error);
  }
}

/* ---------- Show one question ---------- */

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const total = questions.length;
  selectedAnswer = null;

  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  progressTextEl.textContent = `Score so far: ${score}`;
  progressBarEl.style.width = `${(currentQuestionIndex / total) * 100}%`;
  questionTextEl.textContent = question.question;

  choicesEl.innerHTML = question.choices
    .map(
      (choice, index) => `
        <label class="list-group-item choice-item d-flex align-items-center gap-2">
          <input class="form-check-input mt-0" type="radio" name="answer" value="${index}">
          <span>${escapeHTML(choice)}</span>
        </label>`
    )
    .join("");

  // Listen for the selected answer
  choicesEl.querySelectorAll("input[name='answer']").forEach((radio) => {
    radio.addEventListener("change", () => {
      selectedAnswer = Number(radio.value);
      choicesEl.querySelectorAll(".choice-item").forEach((item) => item.classList.remove("selected"));
      radio.closest(".choice-item").classList.add("selected");
      hideMessage();
    });
  });

  nextBtn.textContent = currentQuestionIndex === total - 1 ? "Finish" : "Next";
  hideMessage();
}

/* ---------- Messages ---------- */

function showMessageInPage(text) {
  const box = document.getElementById("message");
  box.textContent = text;
  box.classList.remove("d-none");
}

function hideMessage() {
  document.getElementById("message").classList.add("d-none");
}

/* ---------- Next / Finish ---------- */

function handleNext() {
  if (selectedAnswer === null) {
    showMessageInPage("Please select an answer before continuing.");
    return;
  }

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const result = {
    userId: currentUser.id,
    score: score,
    total: questions.length,
  };
  localStorage.setItem(QUIZ_SCORE_KEY, JSON.stringify(result));
  window.location.href = "result.html";
}

/* ---------- Start ---------- */

if (currentUser) {
  document.getElementById("studentName").textContent = currentUser.name;
  localStorage.removeItem(QUIZ_SCORE_KEY); // start every attempt clean
  nextBtn.addEventListener("click", handleNext);
  loadQuestions();
}
