export type Priority = "low" | "medium" | "high" | "overdue";

export type TodoStatus = "today" | "upcoming" | "overdue" | "done";

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  createdAt: string;
  dueDate: string;
  completed: boolean;
}