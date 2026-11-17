# Student Quiz Application

A quiz app for students built with HTML, CSS, Bootstrap 5, JavaScript and Local Storage (no backend).

**Live demo:** https://zainabjameel26626-wq.github.io/Student-Quiz-Application/

## Screenshots

<!-- Drag your screenshots here while editing this file on GitHub -->

## Features
- Register and login with Local Storage
- Protected quiz and result pages (redirects to login if not signed in)
- 10 questions loaded with the Fetch API from `data/questions.json`
- Score, percentage and pass/fail (50% to pass)
- Try Again and Logout

## Technologies
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Fetch API
- Local Storage

## How to run
`fetch()` does not work when the HTML file is opened directly, so use a local server:
1. Download or clone this repository:
   ```bash
   git clone https://github.com/zainabjameel26626-wq/Student-Quiz-Application.git
   ```
2. Open the project folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.

## Project structure
```text
Student-Quiz-Application/
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

## How to customise
- To change or add questions, edit `data/questions.json` and keep the same format as the existing questions.
- To change the passing score, edit the pass percentage in `js/quiz.js`.

> Note: passwords are stored as plain text because this is a learning project. A real application must hash passwords on a server.
