const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-button');

// Function to fetch todos from the API
async function getTodos() {
  const response = await fetch('http://localhost:5000/todos');
  const todos = await response.json();

  // Display the todos in the list
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.text;
    todoList.appendChild(listItem);
  });
}

// Function to add a new todo
async function addTodo() {
  const text = newTodoInput.value;
  if (text.trim() === '') return;

  const response = await fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text })
  });

  const newTodo = await response.json();
  getTodos(); // Refresh the todo list
  newTodoInput.value = ''; // Clear the input
}

addButton.addEventListener('click', addTodo);

// Load the todos when the page loads
getTodos();
