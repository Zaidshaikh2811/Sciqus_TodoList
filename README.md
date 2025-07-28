# Sciqus Todo App

A modern Todo List application built with React and Vite. This project features user authentication, CRUD operations for todos and users, search, pagination, and persistent storage using localStorage and static JSON files for demo purposes.

## Features

- User Signup & Login (with localStorage persistence)
- Add, edit, complete, and delete todos
- Each todo is associated with a user (multi-user support)
- Search todos by text
- Pagination for large todo lists
- Styled with modern, responsive UI
- In-memory and file-based (localStorage) data storage
- Dummy data for quick start

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Project Structure

- `src/` - Main source code
  - `component/` - Reusable UI components (Login, Signup, TodoForm, TodoList, TodoItem)
  - `page/` - Main pages (Dashboard, NotFound)
  - `lib/` - API logic for CRUD operations (fileApi.js)
  - `data/` - Initial dummy data
  - `store/` - State management (authStore.js)
- `public/` - Static files (todos.json, users.json, logo)

### Data Storage
- Todos and users are loaded from `/public/todos.json` and `/public/users.json` on first load.
- All changes are saved to localStorage (no backend server required).

### Customization
- Update styles in `src/component/login/Auth.scss`, `App.scss`, and component `.module.scss` files.
- Modify initial data in `src/data/initialTodos.js` or the JSON files in `public/`.

### Limitations
- This project is for demo/learning purposes. Data is not persisted to a real backend.
- POST requests to static JSON files will not work in production/static hosting.

## License

MIT
