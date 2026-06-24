import { MapPin, Moon } from "lucide-react";
import type { AccommodationPlan, PlanDecision } from "@/types/view-plan";
import { SectionHeaderActions } from "./SectionHeaderActions";
import styles from "./ViewPlanPage.module.css";

type AccommodationSectionProps = {
  accommodation: AccommodationPlan;
  decisions: PlanDecision[];
  onDecisionOpen: (decisions: PlanDecision[]) => void;
};

export function AccommodationSection({
  accommodation,
  decisions,
  onDecisionOpen
}: AccommodationSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <p>04</p>
        <div className={styles.sectionTitle}>
          <h2>Accommodation</h2>
          {accommodation.picNames.length ? <span>PIC: {accommodation.picNames.join(", ")}</span> : null}
        </div>
        <SectionHeaderActions decisions={decisions} onDecisionOpen={onDecisionOpen} />
      </header>

      <article className={styles.recordCard}>
        <div className={styles.recordTopline}>
          <span>{accommodation.stayPeriod}</span>
          <Moon size={18} aria-hidden="true" />
        </div>
        <h3>{accommodation.name}</h3>
        <p className={styles.location}>
          <MapPin size={15} aria-hidden="true" />
          {accommodation.location}
        </p>
        <p className={styles.bodyText}>{accommodation.roomNote}</p>
      </article>
    </section>
  );
}
