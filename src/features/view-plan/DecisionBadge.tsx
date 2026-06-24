import { ClipboardList } from "lucide-react";
import type { PlanDecision } from "@/types/view-plan";
import styles from "./ViewPlanPage.module.css";

type DecisionBadgeProps = {
  decisions: PlanDecision[];
  onOpen: (decisions: PlanDecision[]) => void;
};

export function DecisionBadge({ decisions, onOpen }: DecisionBadgeProps) {
  if (!decisions.length) {
    return null;
  }

  return (
    <button className={styles.decisionButton} type="button" onClick={() => onOpen(decisions)}>
      <ClipboardList size={15} aria-hidden="true" />
      <span>View Keputusan</span>
      {decisions.length > 1 ? <strong>{decisions.length}</strong> : null}
    </button>
  );
}
