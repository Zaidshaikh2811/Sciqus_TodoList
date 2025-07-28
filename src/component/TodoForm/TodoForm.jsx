import { useState } from 'react';
import styles from './TodoForm.module.scss';

const TodoForm = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    if (inputText.trim() === '') return; // Don't add empty todos

    onAddTodo(inputText);
    setInputText(''); // Clear the input field after adding
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;