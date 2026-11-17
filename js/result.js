// result.js: show the final score, percentage and pass / fail

const QUIZ_SCORE_KEY = "quizScore";
const PASS_PERCENTAGE = 50;

const user = requireLogin(); // redirects to login if not logged in

function readResult() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_SCORE_KEY));
  } catch (error) {
    return null;
  }
}

if (user) {
  const result = readResult();

  // No result for this student yet: send them to the quiz
  if (!result || result.userId !== user.id) {
    window.location.href = "quiz.html";
  } else {
    const percentage = Math.round((result.score / result.total) * 100);
    const passed = percentage >= PASS_PERCENTAGE;

    document.getElementById("studentName").textContent = user.name;
    document.getElementById("score").textContent = result.score;
    document.getElementById("total").textContent = result.total;
    document.getElementById("percentage").textContent = `${percentage}%`;

    const statusEl = document.getElementById("status");
    statusEl.className = passed ? "alert alert-success" : "alert alert-danger";
    statusEl.textContent = passed
      ? `Congratulations ${user.name}, you passed!`
      : `You did not pass this time. Try again, ${user.name}.`;

    document.getElementById("tryAgainBtn").addEventListener("click", () => {
      localStorage.removeItem(QUIZ_SCORE_KEY);
      window.location.href = "quiz.html";
    });
  }
}
