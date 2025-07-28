import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            <div className={styles.checkboxWrapper} onClick={() => onToggle(todo.id)}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                />
                <label></label>
            </div>

            <span className={styles.text}>{todo.title}</span>

            <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
                ×
            </button>
        </li>
    );
};

export default TodoItem;