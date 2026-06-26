// Seed source for the one-time `seed:run` mutation. Convex functions cannot
// import from `src/`, so the content lives here. Foreign keys are expressed by
// `decisionSlug` and resolved to real `v.id("decisions")` during the seed.
//
// Mirrors the (current, real) values in `src/data/*`. After the migration is
// verified and pages read Convex, `src/data/*` is deleted and this is canonical.

const TS = "2026-06-20T03:00:00.000Z";

export const seedEvent = {
  name: "Gathering Ayam 2026",
  dateText: "31 Jul - 2 Aug 2026",
  durationText: "3 Hari 2 Malam",
  location: "Villa Sajuri",
  participantCount: 15
};

export const seedArchive = [
  { year: "2025", title: "Asmarian Gathering 2025", description: "Setiap tahun, alasan yang sama." },
  { year: "2024", title: "Asmarian Gathering 2024", description: "Hujan lebat, tetap jadi." },
  { year: "2023", title: "Asmarian Gathering 2023", description: "Permulaan yang tak dirancang." }
];

export const seedTasks = [
  { title: "Kumpul duit", ownerName: "Yan", status: "todo" as const },
  { title: "Finalise jadual outfit", ownerName: "Tien", status: "todo" as const },
  { title: "Order dessert", ownerName: "Jeny", status: "todo" as const },
  { title: "Order spaghetti + satay", ownerName: "Paten", status: "todo" as const },
  { title: "Tanya owner Villa pasal pinggan & peralatan", ownerName: "Yan", status: "todo" as const },
  { title: "Print sticker", ownerName: "Yon", status: "done" as const }
].map((t) => ({ ...t, createdAt: TS, updatedAt: TS }));

export const seedDecisions = [
  {
    slug: "decision-accommodation",
    linkedTo: "accommodation" as const,
    title: "Penginapan",
    finalDecision: "Villa Sajuri",
    type: "text" as const,
    source: "Group discussion",
    note: "Dipilih sebab senang untuk 3 hari 2 malam.",
    picNames: ["Yan", "Tien"]
  },
  {
    slug: "decision-outfit-day-1",
    linkedTo: "outfit" as const,
    title: "Tema Outfit Hari 1",
    finalDecision: "White + Denim",
    type: "poll" as const,
    source: "WhatsApp poll",
    note: "Menang cukup selesa, tiada rayuan rasmi diterima.",
    pollOptions: [
      { slug: "white-denim", label: "White + Denim", voteCount: 18, isWinner: true },
      { slug: "earth-tone", label: "Earth Tone", voteCount: 11 },
      { slug: "free-style", label: "Ikut suka hati", voteCount: 5 }
    ],
    picNames: ["Tien"]
  },
  {
    slug: "decision-menu",
    linkedTo: "menu" as const,
    title: "Menu Malam Pertama",
    finalDecision: "Potluck ringan, jangan jadi kenduri penuh.",
    type: "text" as const,
    source: "Committee call",
    note: "Fokus makanan yang senang bawa dan tidak memerlukan drama dapur.",
    picNames: ["Committee"]
  }
];

export const seedOutfits = [
  {
    dayNumber: 1,
    themeName: "White + Denim",
    description: "Clean, casual, dan tidak terlalu cosplay pengawas.",
    imageReferenceUrl: "https://www.pinterest.com/search/pins/?q=white%20denim%20outfit",
    decisionSlug: "decision-outfit-day-1",
    picNames: ["Tien"]
  },
  {
    dayNumber: 2,
    themeName: "Earth Tone",
    description: "Warna tanah, bukan maksudnya datang berdebu.",
    picNames: ["Jeny"]
  },
  {
    dayNumber: 3,
    themeName: "Baju Bebas",
    description: "Hari balik. Utamakan keselesaan dan muka cukup tidur.",
    picNames: []
  }
];

export const seedMenuSections = [
  {
    title: "Mains",
    decisionSlug: "decision-menu",
    items: [
      { slug: "spaghetti", name: "Spaghetti", description: "Order, bukan masak. Cukup untuk satu villa.", assignedPerson: "Paten" },
      { slug: "satay", name: "Satay", description: "Datang dengan kuah kacang, bukan alasan.", assignedPerson: "Paten" }
    ]
  },
  {
    title: "Dessert",
    items: [
      { slug: "dessert", name: "Dessert", description: "Manis penutup, dirahsiakan sampai hari kejadian.", assignedPerson: "Jeny" }
    ]
  },
  {
    title: "Minuman",
    items: [
      { slug: "air-mineral", name: "Air Mineral", description: "Jumlah banyak. Jangan optimistik sangat.", assignedPerson: "Committee" }
    ]
  }
];

export const seedAccommodation = {
  name: "Villa Sajuri",
  stayPeriod: "31 Jul - 2 Aug 2026",
  location: "Selangor",
  roomNote: "Bilik ikut keluarga kecil dan geng yang masih percaya boleh tidur lewat.",
  decisionSlug: "decision-accommodation",
  picNames: ["Yan", "Tien"]
};

export const seedProgramItems = [
  { dayNumber: 1, time: "10:00 AM", title: "Check-in", location: "Lobby", notes: "Jangan terus hilang lepas ambil kunci.", picNames: ["Tien"] },
  { dayNumber: 1, time: "1:00 PM", title: "Lunch dan sesi tunggu semua orang sampai", location: "Dewan kecil", picNames: ["Committee"] },
  { dayNumber: 2, time: "9:30 AM", title: "Aktiviti berkumpulan", location: "Outdoor area", notes: "Bawa air sendiri. Semangat tidak mencukupi.", picNames: ["Paten", "Yan"] },
  { dayNumber: 2, time: "8:00 PM", title: "Dinner rasmi yang tidak terlalu rasmi", location: "Dewan utama", picNames: ["Jeny"] },
  { dayNumber: 3, time: "11:00 AM", title: "Checkout", location: "Lobby", notes: "Pastikan charger, tudung, dan maruah tidak tertinggal.", picNames: [] }
];

export const seedGiftExchange = {
  picNames: ["Yan", "Tien"],
  budgetText: "RM50-RM80",
  description: "Beli hadiah yang berguna. Jangan beli benda yang membuat orang termenung.",
  isDrawn: false
};

// Real PINs were already seeded into Convex (hashed) and are NOT committed here.
// These are placeholders. WARNING: re-seeding from this file (after clearing the
// tables) would set every participant's PIN to the placeholder — reset real PINs
// via the admin `resetPin` mutation afterwards, or restore real values locally
// before re-seeding. PINs are hashed during the seed; never stored plaintext.
const PLACEHOLDER_PIN = "0000";
export const seedParticipants = [
  "Aiman",
  "Azie",
  "Beat",
  "Chae",
  "Dben",
  "Jeny",
  "Mun",
  "Nadiah",
  "Naimah",
  "Paten",
  "Sumaiyyah",
  "Teen",
  "Tien",
  "Yan",
  "Yon"
].map((name) => ({ name, pin: PLACEHOLDER_PIN }));
