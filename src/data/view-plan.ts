import type {
  AccommodationPlan,
  MenuSection,
  OutfitPlan,
  PlanDecision,
  ProgramItem
} from "@/types/view-plan";

export const planDecisions: PlanDecision[] = [
  {
    id: "decision-accommodation",
    linkedTo: "accommodation",
    title: "Penginapan",
    finalDecision: "A'Famosa Resort, Melaka",
    type: "text",
    source: "Group discussion",
    note: "Dipilih sebab senang untuk 3 hari 2 malam.",
    picNames: ["Aina", "Mira"]
  },
  {
    id: "decision-outfit-day-1",
    linkedTo: "outfit",
    title: "Tema Outfit Hari 1",
    finalDecision: "White + Denim",
    type: "poll",
    source: "WhatsApp poll",
    note: "Menang cukup selesa, tiada rayuan rasmi diterima.",
    pollOptions: [
      { id: "white-denim", label: "White + Denim", voteCount: 18, isWinner: true },
      { id: "earth-tone", label: "Earth Tone", voteCount: 11 },
      { id: "free-style", label: "Ikut suka hati", voteCount: 5 }
    ],
    picNames: ["Aina"]
  },
  {
    id: "decision-menu",
    linkedTo: "menu",
    title: "Menu Malam Pertama",
    finalDecision: "Potluck ringan, jangan jadi kenduri penuh.",
    type: "text",
    source: "Committee call",
    note: "Fokus makanan yang senang bawa dan tidak memerlukan drama dapur.",
    picNames: ["Committee"]
  }
];

export const outfitPlans: OutfitPlan[] = [
  {
    id: "outfit-day-1",
    dayNumber: 1,
    themeName: "White + Denim",
    description: "Clean, casual, dan tidak terlalu cosplay pengawas.",
    imageReferenceUrl: "https://www.pinterest.com/search/pins/?q=white%20denim%20outfit",
    decisionId: "decision-outfit-day-1",
    picNames: ["Aina", "Mira"]
  },
  {
    id: "outfit-day-2",
    dayNumber: 2,
    themeName: "Earth Tone",
    description: "Warna tanah, bukan maksudnya datang berdebu.",
    picNames: ["Sarah"]
  },
  {
    id: "outfit-day-3",
    dayNumber: 3,
    themeName: "Baju Bebas",
    description: "Hari balik. Utamakan keselesaan dan muka cukup tidur.",
    picNames: []
  }
];

export const menuSections: MenuSection[] = [
  {
    id: "mains",
    title: "Mains",
    decisionId: "decision-menu",
    items: [
      {
        id: "nasi-arab",
        name: "Nasi Arab",
        description: "Fragrant rice, ayam bakar, acar.",
        assignedPerson: "Aina"
      },
      {
        id: "mee-goreng",
        name: "Mee Goreng",
        description: "Pilihan selamat untuk yang datang lapar betul.",
        assignedPerson: "Haziq"
      }
    ]
  },
  {
    id: "dessert",
    title: "Dessert",
    items: [
      {
        id: "brownies",
        name: "Brownies",
        description: "Chocolate, accepted by the nation.",
        assignedPerson: "Sarah"
      },
      {
        id: "buah",
        name: "Buah Potong",
        description: "Supaya ada unsur bertanggungjawab.",
        assignedPerson: "Mira"
      }
    ]
  },
  {
    id: "drinks",
    title: "Minuman",
    items: [
      {
        id: "air-mineral",
        name: "Air Mineral",
        description: "Jumlah banyak. Jangan optimistik sangat.",
        assignedPerson: "Committee"
      }
    ]
  }
];

export const accommodationPlan: AccommodationPlan = {
  id: "afamosa-resort",
  name: "A'Famosa Resort, Melaka",
  stayPeriod: "31 Jul - 2 Aug 2026",
  location: "Melaka",
  roomNote: "Bilik ikut keluarga kecil dan geng yang masih percaya boleh tidur lewat.",
  decisionId: "decision-accommodation",
  picNames: ["Aina", "Mira"]
};

export const programItems: ProgramItem[] = [
  {
    id: "check-in",
    dayNumber: 1,
    time: "10:00 AM",
    title: "Check-in",
    location: "Lobby",
    notes: "Jangan terus hilang lepas ambil kunci.",
    picNames: ["Mira"]
  },
  {
    id: "lunch",
    dayNumber: 1,
    time: "1:00 PM",
    title: "Lunch dan sesi tunggu semua orang sampai",
    location: "Dewan kecil",
    picNames: ["Committee"]
  },
  {
    id: "group-activity",
    dayNumber: 2,
    time: "9:30 AM",
    title: "Aktiviti berkumpulan",
    location: "Outdoor area",
    notes: "Bawa air sendiri. Semangat tidak mencukupi.",
    picNames: ["Haziq", "Aina"]
  },
  {
    id: "dinner",
    dayNumber: 2,
    time: "8:00 PM",
    title: "Dinner rasmi yang tidak terlalu rasmi",
    location: "Dewan utama",
    picNames: ["Sarah"]
  },
  {
    id: "checkout",
    dayNumber: 3,
    time: "11:00 AM",
    title: "Checkout",
    location: "Lobby",
    notes: "Pastikan charger, tudung, dan maruah tidak tertinggal.",
    picNames: []
  }
];
