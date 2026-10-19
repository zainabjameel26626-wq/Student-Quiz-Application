// auth.js: register, login, current user and logout (Local Storage only)

const STUDENTS_KEY = "students";
const CURRENT_USER_KEY = "currentUser";

/* ---------- Local Storage helpers ---------- */

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getStudents() {
  return readJSON(STUDENTS_KEY, []);
}

function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function getCurrentUser() {
  return readJSON(CURRENT_USER_KEY, null);
}

/* Redirects to the login page when nobody is logged in. Returns the user otherwise. */
function requireLogin() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY); // keep the students list
  window.location.href = "index.html";
}

/* ---------- UI helper ---------- */

function showMessage(text, type = "danger") {
  const box = document.getElementById("message");
  if (!box) return;
  box.className = `alert alert-${type}`;
  box.textContent = text;
}

/* ---------- Register ---------- */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRegistration(name, email, password, confirmPassword) {
  if (!name || !email || !password || !confirmPassword) {
    return "Please fill in all fields.";
  }
  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  if (password !== confirmPassword) {
    return "Password and confirm password do not match.";
  }
  const exists = getStudents().some((student) => student.email === email);
  if (exists) {
    return "This email is already registered. Please log in.";
  }
  return "";
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const error = validateRegistration(name, email, password, confirmPassword);
    if (error) {
      showMessage(error);
      return;
    }

    const students = getStudents();
    students.push({ id: Date.now(), name, email, password });
    saveStudents(students);

    window.location.href = "index.html?registered=1";
  });
}

/* ---------- Login ---------- */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  // Already logged in? Go straight to the quiz.
  if (getCurrentUser()) {
    window.location.href = "quiz.html";
  }

  // Success message after registering
  const params = new URLSearchParams(window.location.search);
  if (params.get("registered") === "1") {
    showMessage("Account created. You can log in now.", "success");
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showMessage("Please enter your email and password.");
      return;
    }

    const student = getStudents().find((s) => s.email === email);

    if (!student) {
      showMessage("No account found with this email.");
      return;
    }
    if (student.password !== password) {
      showMessage("Incorrect password. Please try again.");
      return;
    }

    // Save the session user (without the password)
    const currentUser = { id: student.id, name: student.name, email: student.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    window.location.href = "quiz.html";
  });
}

/* ---------- Logout button (quiz and result pages) ---------- */

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
