export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  createdAt: string;
  completed: boolean;
}