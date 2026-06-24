import { ExternalLink, Shirt } from "lucide-react";
import type { OutfitPlan, PlanDecision } from "@/types/view-plan";
import { SectionHeaderActions } from "./SectionHeaderActions";
import styles from "./ViewPlanPage.module.css";

type OutfitSectionProps = {
  outfits: OutfitPlan[];
  picNames: string[];
  decisions: PlanDecision[];
  onDecisionOpen: (decisions: PlanDecision[]) => void;
};

export function OutfitSection({ outfits, picNames, decisions, onDecisionOpen }: OutfitSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <p>02</p>
        <div className={styles.sectionTitle}>
          <h2>Outfit</h2>
          {picNames.length ? <span>PIC: {picNames.join(", ")}</span> : null}
        </div>
        <SectionHeaderActions decisions={decisions} onDecisionOpen={onDecisionOpen} />
      </header>

      <div className={styles.outfitGrid}>
        {outfits.map((outfit) => (
          <article className={styles.recordCard} key={outfit.id}>
            <div className={styles.recordTopline}>
              <span>Hari {outfit.dayNumber}</span>
              <Shirt size={18} aria-hidden="true" />
            </div>
            <h3>{outfit.themeName}</h3>
            {outfit.description ? <p className={styles.bodyText}>{outfit.description}</p> : null}
            {outfit.imageReferenceUrl ? (
              <a className={styles.inlineLink} href={outfit.imageReferenceUrl} target="_blank" rel="noreferrer">
                Buka Rujukan
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
