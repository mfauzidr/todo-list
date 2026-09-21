import "./style.css";
import { todoData } from "./data/todo.data";

const todos = [...todoData];

function renderTodos() {
  const todoList = document.querySelector<HTMLUListElement>("#todo-list");
  const doneList = document.querySelector<HTMLUListElement>("#done-list");

  if (!todoList || !doneList) {
    throw new Error("Todo list element not found");
  }

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  const todoItems = todos.filter((todo) => !todo.completed);
  const doneItems = todos.filter((todo) => todo.completed);

  todoItems.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    todoList.appendChild(li);
  });

  doneItems.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    doneList.appendChild(li);
  });
}

renderTodos();
