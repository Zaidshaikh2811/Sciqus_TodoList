import { useState, useEffect } from "react";
import { fetchTodos, storeTodos, addTodo as addTodoApi, updateTodo as updateTodoApi, deleteTodo as deleteTodoApi } from "../lib/fileApi.js";
import TodoForm from "../component/TodoForm/TodoForm.jsx";
import TodoList from "../component/TodoList/TodoList.jsx";

function Dashboard({user}) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [currentUser, setCurrentUser] = useState(user);

  // Fetch todos on mount or when user changes
  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchTodos(currentUser.id).then((data) => setTodos(data));
    }
  }, [currentUser]);

  const addTodo = async (text) => {
    const newTodo = {
      id: Date.now(),
      title: text,
      completed: false,
      userId: currentUser.id
    };

    const updatedTodos = await addTodoApi(newTodo);
    // Filter for current user's todos
    setTodos(updatedTodos.filter(todo => String(todo.userId) === String(currentUser.id)));
    setCurrentPage(1);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { completed: !todo.completed };
    const updatedTodos = await updateTodoApi(id, updated);
    // Filter for current user's todos
    setTodos(updatedTodos.filter(todo => String(todo.userId) === String(currentUser.id)));
  };

  const deleteTodoHandler = async (id) => {
    const updatedTodos = await deleteTodoApi(id);
    // Filter for current user's todos
    setTodos(updatedTodos.filter(todo => String(todo.userId) === String(currentUser.id)));
  };

  // Search and pagination logic
  const filteredTodos = todos.filter(todo =>
      (todo.text || todo.title || "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredTodos.length / pageSize);
  const paginatedTodos = filteredTodos.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
      <div className="app-container">
        <h1>Sciqus Todo List</h1>
        <input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
        />
        <TodoForm onAddTodo={addTodo} />
        <TodoList
            todos={paginatedTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodoHandler}
        />
        {totalPages > 1 && (
            <div className="pagination-container">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      disabled={currentPage === i + 1}
                      className={`pagination-btn${currentPage === i + 1 ? ' active' : ''}`}
                  >
                    {i + 1}
                  </button>
              ))}
            </div>
        )}
      </div>
  );
}

export default Dashboard;