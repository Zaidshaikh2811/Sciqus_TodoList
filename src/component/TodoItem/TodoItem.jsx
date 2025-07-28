import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxWrapper} onClick={() => onToggle(todo.id)}>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly // The visual part is handled by the label
        />
        <label></label> {/* This label is our custom-styled checkbox */}
      </div>
      
      <span className={styles.text}>{todo.text}</span>

      <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
        ×  
      </button>
    </li>
  );
};

export default TodoItem;