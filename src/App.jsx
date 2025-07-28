import { useState, useEffect } from 'react';
import Login from './component/login/Login';
import Signup from './component/login/Signup';
import TodoList from './component/TodoList/TodoList';
import TodoForm from './component/TodoForm/TodoForm';
import { initialTodos } from './data/initialTodos';
import './App.scss';

// Load initial todos from localStorage or fallback to default
const getInitialState = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : initialTodos;
};

function App() {
  const [todos, setTodos] = useState(getInitialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Save todos to localStorage when changed
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Login with validation from localStorage
  const handleLogin = (email, password) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email) {
      setIsLoggedIn(true);
    } else {
      alert('User not found. Please sign up.');
    }
  };

  const handleSignup = (name, email, password) => {
    if (name && email && password) {
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      setShowSignup(false);
      alert('Signup successful! Please log in.');
    } else {
      alert('Please fill all fields.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <>
              <Signup onSignup={handleSignup} />
              <p>
                Already have an account?{' '}
                <button onClick={() => setShowSignup(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setShowSignup(true)}>Sign Up</button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Sciqus Todo List</h1>
          <button onClick={handleLogout} style={{ marginBottom: '10px' }}>
            Logout
          </button>
          <TodoForm onAddTodo={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </>
      )}
    </div>
  );
}

export default App;
