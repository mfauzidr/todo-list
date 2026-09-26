import "./style.css";
import { todoData } from "./data/todo.data";
import { createTodoCard } from "./render/todoRender";
import { renderDate } from "./render/dateRender";
import { Todo } from "./types/todo";

let todos: Todo[] = [...todoData];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    const parsedTodos = JSON.parse(storedTodos);
    todos = parsedTodos;
  }
};

// Render Todo //

export const renderTodos = () => {
  const todayList = document.querySelector<HTMLDivElement>("#today-list");

  const upcomingList = document.querySelector<HTMLDivElement>("#upcoming-list");

  const overdueList = document.querySelector<HTMLDivElement>("#overdue-list");

  const doneList = document.querySelector<HTMLDivElement>("#done-list");

  if (!todayList || !upcomingList || !overdueList || !doneList) {
    throw new Error("Todo list element not found");
  }

  todayList.innerHTML = "";
  upcomingList.innerHTML = "";
  overdueList.innerHTML = "";
  doneList.innerHTML = "";

  const currentDate = new Date();

  const today = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const activeTodos = todos.filter((todo) => !todo.completed);

  const todayItems = activeTodos.filter((todo) => todo.dueDate === today);

  const upcomingItems = activeTodos.filter((todo) => todo.dueDate > today);

  const overdueItems = activeTodos.filter((todo) => todo.dueDate < today);

  const doneItems = todos.filter((todo) => todo.completed);

  const handleDelete = (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
    }
    saveTodos();
    renderTodos();
  };

  todayItems.forEach((todo) => {
    const card = createTodoCard(
      todo,
      () => {
        saveTodos();
        renderTodos();
      },
      handleDelete,
      "today",
    );

    todayList.appendChild(card);
  });

  upcomingItems.forEach((todo) => {
    const card = createTodoCard(
      todo,
      () => {
        saveTodos();
        renderTodos();
      },
      handleDelete,
      "upcoming",
    );

    upcomingList.appendChild(card);
  });

  overdueItems.forEach((todo) => {
    const card = createTodoCard(
      todo,
      () => {
        saveTodos();
        renderTodos();
      },
      handleDelete,
      "overdue",
    );

    overdueList.appendChild(card);
  });

  doneItems.forEach((todo) => {
    const card = createTodoCard(
      todo,
      () => {
        saveTodos();
        renderTodos();
      },
      handleDelete,
      "done",
    );

    doneList.appendChild(card);
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
  saveTodos();
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

  const newId =
    todos.length > 0
      ? Math.max(...todos.map((todo) => Number(todo.id))) + 1
      : 1;

  const selectedPriority = document.querySelector<HTMLInputElement>(
    'input[name="priority"]:checked',
  );

  if (!selectedPriority) {
    throw new Error("Priority not selected");
  }

  const todoDueDate =
    document.querySelector<HTMLInputElement>("#todo-due-date");
  if (!todoDueDate) {
    throw new Error("Due Date not selected");
  }

  const newTodo: Todo = {
    id: String(newId),
    title: todoTitle.value,
    priority: selectedPriority.value as Todo["priority"],
    createdAt: new Date().toISOString(),
    dueDate: todoDueDate.value,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  todoForm.reset();
});

loadTodos();
renderTodos();
renderDate();
