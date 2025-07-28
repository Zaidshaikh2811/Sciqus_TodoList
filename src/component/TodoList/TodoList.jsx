import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

// now receive onToggle and onDelete and must pass them down
const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
};

export default TodoList;