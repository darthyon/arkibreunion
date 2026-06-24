import type { PlanDecision } from "@/types/view-plan";
import { DecisionBadge } from "./DecisionBadge";
import styles from "./ViewPlanPage.module.css";

type SectionHeaderActionsProps = {
  decisions?: PlanDecision[];
  onDecisionOpen?: (decisions: PlanDecision[]) => void;
};

export function SectionHeaderActions({
  decisions = [],
  onDecisionOpen
}: SectionHeaderActionsProps) {
  if (!decisions.length || !onDecisionOpen) {
    return null;
  }

  return (
    <div className={styles.sectionActions}>
      <DecisionBadge decisions={decisions} onOpen={onDecisionOpen} />
    </div>
  );
}
