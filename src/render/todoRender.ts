import type { Todo } from "../types/todo";
import deleteSVG from "../assets/icons/delete.svg";
import checkedSVG from "../assets/icons/checked.svg";

export const createTodoRow = (
  todo: Todo,
  onChange: () => void,
  onDelete: (id: string) => void,
): HTMLTableRowElement => {
  const tr = document.createElement("tr");
  tr.className = "text-xs md:text-sm lg:text-base";

  const taskName = document.createElement("td");
  taskName.textContent = todo.title;
  taskName.className = "px-6 py-2 border-r border-gray-300";

  const priority = document.createElement("td");
  priority.className = "px-6 py-2 border-r border-gray-300 text-center";

  const priorityBadge = document.createElement("span");
  priorityBadge.textContent = todo.priority;
  priorityBadge.className = "capitalize px-2 py-0.5 rounded-full text-xs";

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
  action.className = "px-3 py-2";

  const actionWrapper = document.createElement("div");
  actionWrapper.className = "flex items-center justify-center gap-2";

  let statusElement: HTMLInputElement | HTMLImageElement;

  if (todo.completed) {
    const checkedIcon = document.createElement("img");

    checkedIcon.src = checkedSVG;
    checkedIcon.alt = "Completed";
    checkedIcon.className = "w-5 h-5";

    statusElement = checkedIcon;
  } else {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      todo.completed = true;
      onChange();
    });

    statusElement = checkbox;
  }

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", () => {
    const row = deleteButton.closest("tr");

    console.log(row);

    onDelete(todo.id);
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.src = deleteSVG;
  deleteIcon.alt = "Delete";
  deleteIcon.className = "w-5 h-5 hover:cursor-pointer";

  deleteButton.appendChild(deleteIcon);

  actionWrapper.append(statusElement, deleteButton);
  action.appendChild(actionWrapper);

  tr.append(taskName, priority, action);

  return tr;
};
