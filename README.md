# 📖 NotesApp

A notes-taking web application with user authentication (signup, login, profile management) and full notes CRUD — create, edit, pin, search, and delete personal notes. Built with a custom "ruled notebook paper" design system.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

**Live Demo:** https://notes-app-project-two.vercel.app
**Repo:** https://github.com/renupriya20/NotesApp-Project

---

## ✨ Features

- 🔐 **Authentication** — signup, login, and logout
- 📝 **Notes CRUD** — create, edit, delete, and pin notes
- 🔍 **Search** — instantly filter notes by title or content
- 📌 **Pinning** — pinned notes float to the top, marked with a washi-tape accent
- 👤 **Profile management** — update username/password, or delete your account
- 🔒 **Protected routes** — notes and profile pages require a logged-in session
- 📱 **Responsive design** — works cleanly on mobile, tablet, and desktop
- 🎨 **Custom design system** — a "ruled paper / index card" theme built with Tailwind CSS v4 tokens, not default components

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS v4
- React Router
- Axios
- React Hot Toast
- React Icons

**Backend**
- Node.js
- JSON Server (mock REST API for local development)
- CORS

---

## 📂 Project Structure

NotesApp-Project/
├── backend/
│   ├── api.json        # mock database (users, notes)
│   ├── server.js         # JSON Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Navbar, NoteCard, NoteModal
    │   ├── pages/          # Login, Signup, Home, EditProfile, NotFound
    │   ├── routes/          # ProtectedRoute, Router
    │   ├── context/          # UserContextProvider (auth state)
    │   ├── config/            # Axios instance
    │   └── index.css          # design tokens (@theme)
    └── .env


---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### 1. Clone the repo
bash
git clone https://github.com/renupriya20/NotesApp-Project.git
cd NotesApp-Project


### 2. Backend setup
bash
  cd backend
  npm install
  npm run dev

This starts a mock REST API at http://localhost:3000 , backed by  api.json.

### 3. Frontend setup
Open a new terminal:
bash
cd frontend
npm install
npm run dev


Make sure `frontend/.env` points at the backend:
env
VITE_BACKEND_BASE_URL="http://localhost:3000"


The app will be running at http://localhost:5173.

---

## 🔑 API Overview

| Method | Endpoint                  | Description                     |
|--------|-----------------------------|-----------------------------------|
| GET    | /users?email=&password=`  | Look up a user for login          |
| POST   | /users                    | Create a new account (signup)     |
| PATCH  | /users/:id                | Update username/password          |
| DELETE | /users/:id                | Delete account                    |
| GET    | /notes?userId=            | Get a user's notes                |
| POST   | /notes                    | Create a note                     |
| PATCH  | /notes/:id                | Update or pin/unpin a note        |
| DELETE | /notes/:id                | Delete a note                     |

---

## ⚠️ A note on this backend

This project uses **JSON Server** as a mock backend for local development and prototyping — it's not a production-grade server. Passwords are stored in plain text and there's no real authentication token, so this setup is meant for demos and learning, not for real users' data. A production version would need a real database, password hashing, and token-based authentication.

---

## 🎨 Design System

The UI leans into the "notes app" concept literally: a ruled-paper background, index-card-style panels with a red top rule and two punch holes, and a strip of washi tape marking pinned notes. Typography pairs a serif display face with a clean sans body and a monospace face for metadata (dates, labels).

Design tokens live in `frontend/src/index  .css` under Tailwind's `@theme` block (`--color-ink`, `--color-rule`, `--color-paper`, `--font-display`, etc.) — utility classes like `bg-ink`, `text-rule`, and `font-display` are generated from these.

---

## 📌 Future Improvements

- [ ] Real backend with a database, password hashing, and JWT auth
- [ ] Note categories / tags
- [ ] Dark mode
- [ ] Trash bin for deleted notes (soft delete)

---

## 👤 Author

**Renu Priya**
[GitHub](https://github.com/renupriya20) · [LinkedIn](https://www.linkedin.com/in/renu-kumari-45b848287/) · [Email](kumarirenupriya20@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
