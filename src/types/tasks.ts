export type TaskStatus = "todo" | "doing" | "blocked" | "done";

export type ReunionTask = {
  id: string;
  title: string;
  description?: string;
  ownerName?: string;
  picNames?: string[];
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
