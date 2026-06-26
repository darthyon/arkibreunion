import type { HomeCardItem } from "@/types/homepage";

export const homeCards: HomeCardItem[] = [
  {
    id: "gerak-kerja",
    number: "04",
    title: "Gerak Kerja",
    description: "Untuk kerja yang perlu jalan, bukan sekadar dibincangkan.",
    cta: "Lihat Tugas",
    href: "/gerak-kerja",
    tone: "green",
    illustration: "/illustrations/gerak-kerja.svg"
  },
  {
    id: "view-plan",
    number: "01",
    title: "View Plan",
    description: "Apa pakai, apa makan, apa jadi, semua dekat sini.",
    cta: "Lihat Plan",
    href: "/view-plan",
    tone: "blue",
    illustration: "/illustrations/view-plan.svg"
  },
  {
    id: "summary",
    number: "03",
    title: "Gathering Ayam 2026",
    badge: "Fail Semasa",
    description: "Rekod rasmi untuk gathering yang katanya reunion tapi tahunan.",
    cta: "Lihat Ringkasan",
    href: "/view-plan",
    tone: "summary",
    illustration: "/illustrations/summary.svg",
    countdownTargetDate: "2026-07-31",
    summaryRows: [
      { label: "Tarikh", value: "31 Jul - 2 Aug 2026", icon: "calendar" },
      { label: "Tempoh", value: "3 Hari 2 Malam", icon: "clock" },
      { label: "Lokasi", value: "Villa Sajuri", icon: "location" },
      { label: "Peserta", value: "15 orang berdaftar", icon: "people" }
    ]
  },
  {
    id: "tukar-hadiah",
    number: "02",
    title: "Tukar Hadiah",
    description: "Cabutan nama, wishlist, dan sedikit unsur suspen.",
    cta: "Lihat Hadiah",
    href: "/tukar-hadiah",
    tone: "red",
    illustration: "/illustrations/tukar-hadiah.svg"
  },
  {
    id: "album-rahsia",
    number: "05",
    title: "Album Rahsia",
    badge: "Coming Soon",
    description: "Untuk kenangan yang tak sesuai dibiarkan berkeliaran.",
    cta: "Tak Payah Tunggu",
    href: "/album-rahsia",
    tone: "yellow",
    illustration: "/illustrations/album-rahsia.svg",
    isComingSoon: true
  }
];
