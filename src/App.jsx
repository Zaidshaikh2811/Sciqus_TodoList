import { useState, useEffect } from 'react';
import TodoList from './component/TodoList/TodoList';
import TodoForm from './component/TodoForm/TodoForm';
import { initialTodos } from './data/initialTodos';
import './App.scss';

// A function to get initial state from localStorage or use the dummy data
const getInitialState = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : initialTodos;
};

function App() { 
  const [todos, setTodos] = useState(getInitialState);
  // Save to localStorage whenever todos changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);  
 
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),  
      text: text,
      completed: false,
    };
    setTodos([newTodo, ...todos]); 
  };

  // Handler to toggle the completed status of a todo
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
      <h1>Sciqus Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;