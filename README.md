# To-Do List Application

A simple To-Do List app with a Vue 3 frontend and NestJS backend.

---

## Tech Stack

- **Frontend:** Vue 3, Vite, TypeScript, Pinia, Tailwind CSS
- **Backend:** NestJS, MongoDB
- **Testing:** Vitest (Frontend), Jest (Backend)

---

## Setup

Since this project is structured as a monorepo, you can install all dependencies globally:

1. Install all dependencies:
    ```bash
    npm install
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd packages/frontend
    ```

2. Start the frontend development server:
    ```bash
    make serve
    ```
   The frontend will be available at `http://localhost:5173/`.

### Backend

1. Navigate to the backend directory:
    ```bash
    cd packages/backend
    ```

2. Start the backend (and MongoDB container):
    ```bash
    make serve-all
    ```
   The backend will be available at `http://localhost:3000/`.

