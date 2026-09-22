import "./style.css";
import { todoData } from "./data/todo.data";
import { createTodoRow } from "./render/todoRender";

const todos = [...todoData];

function renderTodos() {
  const todoList =
    document.querySelector<HTMLTableSectionElement>("#todo-list");
  const doneList =
    document.querySelector<HTMLTableSectionElement>("#done-list");

  if (!todoList || !doneList) {
    throw new Error("Todo list element not found");
  }

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  const todoItems = todos.filter((todo) => !todo.completed);
  const doneItems = todos.filter((todo) => todo.completed);

  todoItems.forEach((todo) => {
    const row = createTodoRow(todo);
    todoList.appendChild(row);
  });

  doneItems.forEach((todo) => {
    const row = createTodoRow(todo);
    doneList.appendChild(row);
  });
}

renderTodos();