
const $ftList = $("#ft_list");
const $addNewButton = $("#addnew");

// Function to create a new to-do item
function createTodoItem(content) {
  const $todoItem = $("<div>").addClass("todo").text(content);

  // Add click event to remove the to-do
  $todoItem.on("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      console.log("Removing task:", $(this).text());
      $(this).remove();
      storeTodos();
    }
  });

  // Add new item to the top of the list
  $ftList.prepend($todoItem);
}

// Function to store to-dos in cookies
function storeTodos() {
  const todos = [];
  $(".todo").each(function () {
    todos.push($(this).text());
  });
  document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 2025 23:59:59 GMT`;
  console.log("Cookie stored:", document.cookie); // Debugging
}

// Function to retrieve to-dos from cookies
function retrieveTodos() {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  if (cookies.todos) {
    const storedTodos = JSON.parse(decodeURIComponent(cookies.todos));
    console.log("Loaded todos:", storedTodos); // Debugging
    storedTodos.forEach((task) => createTodoItem(task));
  } else {
    console.log("No todos cookie found."); // Debugging
  }
}

// Function to handle adding a new to-do
$addNewButton.on("click", function () {
  const newTodo = prompt("Please enter a new task:");
  if (newTodo && newTodo.trim()) {
    console.log("Adding new task:", newTodo.trim()); // Debugging
    createTodoItem(newTodo.trim());
    storeTodos();
  } else {
    alert("Task cannot be empty.");
  }
});

// Load todos when the page loads
$(window).on("load", retrieveTodos);