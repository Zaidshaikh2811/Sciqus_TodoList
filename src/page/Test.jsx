import React, {useEffect, useState} from 'react';


export default function Test() {
  const [todos, setTodos] =  useState([]);
  const [newTodo, setNewTodo] =  useState("");


  return (
    <div>
      <h1>Test Page</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button >Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} <button  >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}