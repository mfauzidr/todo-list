import "./style.css";
import { todoData } from "./data/todo.data";
import { createTodoRow } from "./render/todoRender";
import { renderDate } from "./render/dateRender";
import { Todo } from "./types/todo";

const todos = [...todoData];

// Render Todo //

export const renderTodos = () => {
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
    const row = createTodoRow(todo, renderTodos, (id) => {
      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        todos.splice(index, 1);
      }

      renderTodos();
    });
    todoList.appendChild(row);
  });

  doneItems.forEach((todo) => {
    const row = createTodoRow(todo, renderTodos, (id) => {
      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        todos.splice(index, 1);
      }

      renderTodos();
    });
    doneList.appendChild(row);
  });
};

// Delete all button //

const deleteAllButton =
  document.querySelector<HTMLButtonElement>("#delete-all");

if (!deleteAllButton) {
  throw new Error("Delete all button not found");
}

deleteAllButton.addEventListener("click", () => {
  todos.length = 0;
  renderTodos();
});

// submit todo //

const todoForm = document.querySelector<HTMLFormElement>("#todo-form");

const todoTitle = document.querySelector<HTMLInputElement>("#todo-title");

if (!todoForm || !todoTitle) {
  throw new Error("Todo form element not found");
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedPriority = document.querySelector<HTMLInputElement>(
    'input[name="priority"]:checked',
  );

  if (!selectedPriority) {
    throw new Error("Priority not selected");
  }

  const newId =
  todos.length > 0
    ? Math.max(...todos.map((todo) => Number(todo.id))) + 1
    : 1;

  const newTodo: Todo = {
    id: String(newId),
    title: todoTitle.value,
    priority: selectedPriority.value as Todo["priority"],
    createdAt: new Date().toISOString(),
    completed: false,
  };

  todos.push(newTodo);
renderTodos();
});

renderTodos();
renderDate();
