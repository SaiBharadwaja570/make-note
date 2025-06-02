# Make Note

A full-stack note-taking app with user authentication, note CRUD, and pinning functionality. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- User registration and login (JWT-based)
- Add, edit, delete, and pin/unpin notes
- Notes are private to each user
- Responsive, modern UI with Tailwind CSS

## Project Structure
- `backend/` — Node.js/Express API, MongoDB models, authentication
- `frontend/` — React app, Tailwind CSS, API integration

## Setup

### 1. Backend
See [backend/README.md](backend/README.md) for full details.

- `cd backend`
- `npm install`
- Create a `.env` file with your MongoDB URI and JWT secret
- `npm start`

### 2. Frontend
See [frontend/README.md](frontend/README.md) for full details.

- `cd frontend`
- `npm install`
- `npm run dev`
- Open [http://localhost:5173](http://localhost:5173)

## Usage
- Register or login to your account
- Create, edit, delete, and pin notes from the dashboard
- Logout from the profile menu
