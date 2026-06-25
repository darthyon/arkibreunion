import type { ReunionTask } from "@/types/tasks";

export const reunionTasks: ReunionTask[] = [
  {
    id: "task-homestay-payment",
    title: "Confirm homestay payment",
    description: "Check final amount dan confirm tarikh akhir bayaran dengan pihak resort.",
    ownerName: "Aina",
    picNames: ["Aina", "Faris"],
    status: "doing",
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z"
  },
  {
    id: "task-gift-names",
    title: "Collect gift exchange names",
    description: "Pastikan semua orang masuk senarai sebelum cabutan jadi penuh tuduhan.",
    ownerName: "Mira",
    status: "todo",
    createdAt: "2026-06-12T03:00:00.000Z",
    updatedAt: "2026-06-12T03:00:00.000Z"
  },
  {
    id: "task-menu-confirm",
    title: "Confirm senarai menu 3 hari",
    description: "Selaras dengan bajet dan halang menu bertindih hari ke hari.",
    ownerName: "Hakim",
    picNames: ["Hakim"],
    status: "todo",
    createdAt: "2026-06-13T03:00:00.000Z",
    updatedAt: "2026-06-13T03:00:00.000Z"
  },
  {
    id: "task-transport",
    title: "Susun pengangkutan kumpulan",
    description: "Kira kereta, van, dan siapa yang tak boleh dipercayai pegang GPS.",
    ownerName: "Daus",
    status: "doing",
    createdAt: "2026-06-14T03:00:00.000Z",
    updatedAt: "2026-06-19T03:00:00.000Z"
  },
  {
    id: "task-budget",
    title: "Finalise bajet keseluruhan",
    description: "Menunggu confirmation harga homestay sebelum boleh dikunci.",
    ownerName: "Aina",
    status: "blocked",
    createdAt: "2026-06-11T03:00:00.000Z",
    updatedAt: "2026-06-20T03:00:00.000Z"
  },
  {
    id: "task-facilitator",
    title: "Lantik fasilitator aktiviti malam",
    description: "Cari orang yang sanggup buat ais pecah tanpa rasa malu.",
    ownerName: "Syed",
    status: "blocked",
    createdAt: "2026-06-15T03:00:00.000Z",
    updatedAt: "2026-06-21T03:00:00.000Z"
  },
  {
    id: "task-theme",
    title: "Pilih tema dan tarikh muktamad",
    ownerName: "Mira",
    status: "done",
    createdAt: "2026-06-05T03:00:00.000Z",
    updatedAt: "2026-06-08T03:00:00.000Z"
  },
  {
    id: "task-booking",
    title: "Tempah lokasi reunion",
    description: "Deposit dah dibayar, slip disimpan dalam group archive.",
    ownerName: "Faris",
    picNames: ["Faris", "Aina"],
    status: "done",
    createdAt: "2026-06-06T03:00:00.000Z",
    updatedAt: "2026-06-09T03:00:00.000Z"
  }
];
