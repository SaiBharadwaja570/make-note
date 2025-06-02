# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Make Note Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` (or as shown in your terminal).

## Features
- User registration and login (JWT-based)
- Add, edit, delete, and pin/unpin notes
- Notes are private to each user
- Responsive, modern UI with Tailwind CSS

## Environment
- The frontend expects the backend to run at `http://localhost:8000` by default.
- You can change the API base URL in `frontend/utils/helper.js` if needed.

## Usage
- Register or login to your account
- Create, edit, delete, and pin notes from the dashboard
- Logout from the profile menu
