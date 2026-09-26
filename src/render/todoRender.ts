import type { Todo } from "../types/todo";
import type { TodoStatus } from "../types/todo";
import deleteSVG from "../assets/icons/delete.svg";
import checkedSVG from "../assets/icons/checked.svg";

export const createTodoCard = (
  todo: Todo,
  onChange: () => void,
  onDelete: (id: string) => void,
  status: TodoStatus,
): HTMLDivElement => {
  // Card
  const card = document.createElement("div");
  card.className = "flex items-start gap-3 rounded-2xl p-3";
  switch (status) {
    case "today":
      card.classList.add("bg-green-100");
      break;

    case "upcoming":
      card.classList.add("bg-sky-100");
      break;

    case "overdue":
      card.classList.add("bg-rose-100");
      break;

    case "done":
      card.classList.add("bg-yellow-100");
      break;
  }

  // Status
  let statusElement: HTMLInputElement | HTMLImageElement;

  if (todo.completed) {
    const checkedIcon = document.createElement("img");

    checkedIcon.src = checkedSVG;
    checkedIcon.alt = "Completed";
    checkedIcon.className = "w-5 h-5 shrink-0";

    statusElement = checkedIcon;
  } else {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "mt-0.5 h-5 w-5 shrink-0 accent-cyan-600";

    checkbox.addEventListener("change", () => {
      todo.completed = true;
      onChange();
    });

    statusElement = checkbox;
  }

  // Todo content
  const todoContent = document.createElement("div");
  todoContent.className = "min-w-0 flex-1";

  // Todo header
  const todoHeader = document.createElement("div");
  todoHeader.className = "flex items-start justify-between gap-2";

  // Task title
  const taskName = document.createElement("h3");
  taskName.textContent = todo.title;
  taskName.className = "break-words text-sm font-bold text-slate-900";

  // Priority badge
  const priorityBadge = document.createElement("span");
  priorityBadge.textContent = todo.priority;
  priorityBadge.className =
    "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold capitalize";

  switch (todo.priority) {
    case "low":
      priorityBadge.classList.add("bg-green-200", "text-green-900");
      break;

    case "medium":
      priorityBadge.classList.add("bg-yellow-200", "text-yellow-900");
      break;

    case "high":
      priorityBadge.classList.add("bg-rose-200", "text-rose-900");
      break;
  }

  // Due date
  const dueDate = document.createElement("p");

  dueDate.textContent = `Due: ${todo.dueDate}`;

  dueDate.className = "mt-1 text-xs font-medium";

  if (status === "overdue") {
    dueDate.classList.add("text-red-500");
  } else {
    dueDate.classList.add("text-slate-500");
  }

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete ${todo.title}`);
  deleteButton.className = "shrink-0 rounded-lg bg-white/70 p-1 transition hover:bg-white";

  deleteButton.addEventListener("click", () => {
    onDelete(todo.id);
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.src = deleteSVG;
  deleteIcon.alt = "Delete";
  deleteIcon.className = "w-5 h-5";

  deleteButton.appendChild(deleteIcon);

  // Assemble
  todoHeader.append(taskName, priorityBadge);

  todoContent.append(todoHeader, dueDate);

  card.append(statusElement, todoContent, deleteButton);

  return card;
};
