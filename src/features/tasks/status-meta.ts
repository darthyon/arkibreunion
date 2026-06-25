import { CircleDashed, CircleDot, CircleSlash, CircleCheck } from "lucide-react";
import type { TaskStatus } from "@/types/tasks";

export type StatusTone = "neutral" | "green" | "amber" | "muted";

export type StatusMeta = {
  value: TaskStatus;
  label: string;
  helper: string;
  emptyCopy: string;
  tone: StatusTone;
  Icon: typeof CircleDashed;
};

export const statusOrder: TaskStatus[] = ["todo", "doing", "blocked", "done"];

export const statusMeta: Record<TaskStatus, StatusMeta> = {
  todo: {
    value: "todo",
    label: "To Do",
    helper: "Belum jalan.",
    emptyCopy: "Tiada tugas baru.",
    tone: "neutral",
    Icon: CircleDashed
  },
  doing: {
    value: "doing",
    label: "Doing",
    helper: "Sedang diusahakan.",
    emptyCopy: "Belum ada yang sedang jalan.",
    tone: "green",
    Icon: CircleDot
  },
  blocked: {
    value: "blocked",
    label: "Blocked",
    helper: "Ada benda sangkut.",
    emptyCopy: "Tiada yang sangkut. Mencurigakan, tapi bagus.",
    tone: "amber",
    Icon: CircleSlash
  },
  done: {
    value: "done",
    label: "Done",
    helper: "Selesai. Tahniah kecil-kecilan.",
    emptyCopy: "Belum ada yang selesai.",
    tone: "muted",
    Icon: CircleCheck
  }
};

export const statusOptions = statusOrder.map((status) => ({
  value: status,
  label: statusMeta[status].label
}));
