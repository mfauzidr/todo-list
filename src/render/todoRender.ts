import type { Todo } from "../types/todo";
import deleteSVG from "../assets/icons/delete.svg";

export function createTodoRow(todo: Todo): HTMLTableRowElement {
  const tr = document.createElement("tr");
  tr.className = "text-xs md:text-sm lg:text-base";

  const taskName = document.createElement("td");
  taskName.textContent = todo.title;
  taskName.className = "px-6 py-2 border-r border-gray-300";

  const priority = document.createElement("td");
  priority.className =
    "px-6 py-2 border-r border-gray-300 text-center";

  const priorityBadge = document.createElement("span");
  priorityBadge.textContent = todo.priority;
  priorityBadge.className =
    "capitalize px-2 py-0.5 rounded-full text-xs";

  switch (todo.priority) {
    case "low":
      priorityBadge.classList.add("bg-green-200", "text-green-700");
      break;

    case "medium":
      priorityBadge.classList.add("bg-yellow-200", "text-yellow-800");
      break;

    case "high":
      priorityBadge.classList.add("bg-red-200", "text-red-800");
      break;
  }

  priority.appendChild(priorityBadge);

  const action = document.createElement("td");
  action.className =
    "px-6 py-2 flex gap-2 w-full justify-center items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const deleteButton = document.createElement("button");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = deleteSVG;
  deleteIcon.alt = "Delete";
  deleteIcon.className = "w-5 h-5 hover:cursor-pointer";

  deleteButton.appendChild(deleteIcon);

  action.append(checkbox, deleteButton);

  tr.append(taskName, priority, action);

  return tr;
}