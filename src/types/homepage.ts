export type HomeCardTone = "blue" | "red" | "summary" | "green" | "yellow";

export type HomeCardSummaryRow = {
  label: string;
  value: string;
  icon: "calendar" | "clock" | "location" | "people" | "note";
};

export type HomeCardItem = {
  id: string;
  number: string;
  title: string;
  badge?: string;
  description: string;
  cta: string;
  href: string;
  tone: HomeCardTone;
  illustration: string;
  isComingSoon?: boolean;
  summaryRows?: HomeCardSummaryRow[];
  countdownTargetDate?: string;
};
