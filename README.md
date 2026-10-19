# Student Quiz Application

A quiz app for students built with HTML, CSS, Bootstrap 5, JavaScript and Local Storage (no backend).

## Features
- Register and login with Local Storage
- Protected quiz and result pages
- Questions loaded with the Fetch API from `data/questions.json`
- Score, percentage and pass/fail (50% to pass)
- Try Again and Logout

## How to run
`fetch()` does not work when the HTML file is opened directly. Use a local server:
1. Open the `quiz-app` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

## Project structure
```text
quiz-app/
├── index.html        (login)
├── register.html
├── quiz.html
├── result.html
├── css/style.css
├── js/auth.js        (register, login, session, logout)
├── js/quiz.js        (fetch, questions, score)
├── js/result.js      (result page)
└── data/questions.json
```

## Local Storage keys
- `students`: all registered students
- `currentUser`: the logged-in student
- `quizScore`: the last quiz result

> Note: passwords are stored as plain text because this is a learning project. A real application must hash passwords on a server.
