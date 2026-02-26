export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'done' | (string & {});

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string | number;
  title: string;
  description: string;
  column: TaskStatus;
  priority: Priority;
}

export type CreateTaskInput = Omit<Task, "id">;
