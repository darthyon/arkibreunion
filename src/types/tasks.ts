export type TaskStatus = "todo" | "doing" | "blocked" | "done";

export type ReunionTask = {
  id: string;
  title: string;
  description?: string;
  ownerName?: string;
  status: TaskStatus;
};
