export async function fetchUsers() {
  try {
    // Try to get from localStorage first
    const stored = localStorage.getItem('users');
    if (stored) {
      return JSON.parse(stored);
    }

    // Fallback to fetch from file
    const res = await fetch('/users.json');
    const data = await res.json();
    localStorage.setItem('users', JSON.stringify(data));
    return data;
  } catch (error) {
    console.warn('Could not fetch users from file, using localStorage or empty array');
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }
}

export async function fetchTodos(userid) {
  try {
    // Try localStorage first for most up-to-date data
    const stored = localStorage.getItem('todos');
    let todos = [];

    if (stored) {
      todos = JSON.parse(stored);
    } else {
      // Fallback to fetch from file
      try {
        const res = await fetch('/todos.json');
        const data = await res.json();
        todos = data;
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (fetchError) {
        console.warn('Could not fetch todos from file, using empty array');
        todos = [];
      }
    }

    if (userid) {
      return todos.filter(todo => String(todo.userId) === String(userid));
    }
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function storeTodos(todos) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error storing todos:', error);
  }
}

export async function storeUsers(users) {
  try {
    // Note: POST to static files won't work, so we only store in localStorage
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error storing users:', error);
  }
}

// Update a single todo by id
export async function updateTodo(id, updatedTodo) {
  try {
    const todos = await fetchTodos(); // Get all todos
    const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    await storeTodos(newTodos);
    return newTodos;
  } catch (error) {
    console.error('Error updating todo:', error);
    return [];
  }
}

// Delete a single todo by id
export async function deleteTodo(id) {
  try {
    const todos = await fetchTodos(); // Get all todos
    const newTodos = todos.filter(todo => todo.id !== id);
    await storeTodos(newTodos);
    return newTodos;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return [];
  }
}

// Add a new todo
export async function addTodo(newTodo) {
  try {
    const todos = await fetchTodos(); // Get all todos
    const newTodos = [newTodo, ...todos];
    await storeTodos(newTodos);
    return newTodos;
  } catch (error) {
    console.error('Error adding todo:', error);
    return [];
  }
}

// Update a single user by id
export async function updateUser(id, updatedUser) {
  try {
    const users = await fetchUsers();
    const newUsers = users.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
    );
    await storeUsers(newUsers);
    return newUsers;
  } catch (error) {
    console.error('Error updating user:', error);
    return [];
  }
}

// Delete a single user by id
export async function deleteUser(id) {
  try {
    const users = await fetchUsers();
    const newUsers = users.filter(user => user.id !== id);
    await storeUsers(newUsers);
    return newUsers;
  } catch (error) {
    console.error('Error deleting user:', error);
    return [];
  }
}

// Add a new user
export async function addUser(newUser) {
  try {
    const users = await fetchUsers();
    const newUsers = [newUser, ...users];
    await storeUsers(newUsers);
    return newUsers;
  } catch (error) {
    console.error('Error adding user:', error);
    return [];
  }
}