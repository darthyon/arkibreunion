export type PlanSectionId = "decisions" | "outfit" | "menu" | "program";

export type PollOption = {
  id: string;
  label: string;
  voteCount: number;
  isWinner?: boolean;
};

export type PlanDecision = {
  id: string;
  linkedTo: "plan" | "outfit" | "menu" | "accommodation" | "date" | "transport" | "other";
  title: string;
  finalDecision: string;
  type: "text" | "poll";
  source?: string;
  note?: string;
  pollOptions?: PollOption[];
  picNames: string[];
};

export type OutfitPlan = {
  id: string;
  dayNumber: number;
  themeName: string;
  description?: string;
  imageReferenceUrl?: string;
  decisionId?: string;
  picNames: string[];
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  assignedPerson?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  decisionId?: string;
  items: MenuItem[];
};

export type AccommodationPlan = {
  id: string;
  name: string;
  stayPeriod: string;
  location: string;
  roomNote: string;
  decisionId?: string;
  picNames: string[];
};

export type ProgramItem = {
  id: string;
  dayNumber: number;
  time: string;
  title: string;
  location?: string;
  notes?: string;
  picNames: string[];
};
