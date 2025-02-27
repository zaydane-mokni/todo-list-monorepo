# To-Do List Frontend

<p align="center">
  <a href="https://vuejs.org/" target="blank"><img src="https://vuejs.org/images/logo.png" width="120" alt="Vue Logo" /></a>
</p>

<p align="center">A Vue 3 frontend application for managing your To-Do List, using Vite, TypeScript, Pinia, and Vitest for testing.</p>

## Tech Stack

- **Frontend:** Vue 3 (with Vite)
- **State Management:** Pinia
- **Testing:** Vitest
- **Styling:** Tailwind CSS

## Features

- Display a list of tasks with their current status (`to-do`, `in progress`, `done`).
- Create new tasks, edit existing ones, and delete tasks.

## Setup

### Prerequisites

- **Node.js**
- **Vite**

### Project Setup
1. Install dependencies:
    ```bash
    npm install
    ```
2. Run the development server:
    ```bash
    make serve
    ```
   The app will be available at `http://localhost:5173/`.


### Project Make Commands

| Command                | Description                         |
|------------------------|-------------------------------------|
| `make serve`           | Starts the Vite development server. |
| `make test-unit`       | Runs unit tests with Vitest.        |
| `make test-unit-watch` | Watches test files for changes .    |
