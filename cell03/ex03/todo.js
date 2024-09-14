const ftList = document.getElementById("ft_list");
const addNewButton = document.getElementById("addnew");

// Function to create a new to-do item
function createTodoItem(content) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo";
  todoItem.innerText = content;

  // Add click event to remove the to-do
  todoItem.onclick = () => {
    if (confirm("Are you want to delete this task?")) {
      console.log("Removing task:", todoItem.innerText);
      todoItem.remove();
      storeTodos();
    }
  };

  //ให้แอดมาด้านบนสุด
  ftList.prepend(todoItem);
}

// Function to store to-dos in cookies
function storeTodos() {
  //loop store cookie
  const todos = [];
  document.querySelectorAll(".todo").forEach((todo) => {
    todos.push(todo.textContent);
  });
  document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 2025 23:59:59 GMT`;
  // Debugg ด้วย console logconsole.log("Cookie stored:", document.cookie);
}

// Function to retrieve to-dos from cookies
function retrieveTodos() {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  // Debugging: Log the parsed cookies
  //console.log("Parsed cookies:", cookies);

  if (cookies.todos) {
    const storedTodos = JSON.parse(decodeURIComponent(cookies.todos));

    // Debugging: Print the loaded todos
    console.log("Loaded todos:", storedTodos);

    storedTodos.forEach((task) => createTodoItem(task));
  } else {
    //console.log("No todos cookie found."); // Debugging: No todos cookie
  }
}

// Function to handle adding a new to-do
addNewButton.onclick = () => {
  const newTodo = prompt("Please enter a new task:");
  if (newTodo && newTodo.trim()) {
    console.log("Adding new task:", newTodo.trim()); // Debugging log
    createTodoItem(newTodo.trim());
    storeTodos(); // แอดแล้วเก็บ
  } else {
    alert("Task cannot be empty.");
  }
};

window.addEventListener("load", retrieveTodos);
