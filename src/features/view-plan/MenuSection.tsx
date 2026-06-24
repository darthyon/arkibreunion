import { Utensils } from "lucide-react";
import type { MenuSection as MenuSectionType, PlanDecision } from "@/types/view-plan";
import { SectionHeaderActions } from "./SectionHeaderActions";
import styles from "./ViewPlanPage.module.css";

type MenuSectionProps = {
  sections: MenuSectionType[];
  picNames: string[];
  decisions: PlanDecision[];
  onDecisionOpen: (decisions: PlanDecision[]) => void;
};

export function MenuSection({ sections, picNames, decisions, onDecisionOpen }: MenuSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <p>03</p>
        <div className={styles.sectionTitle}>
          <h2>Menu Makan</h2>
          {picNames.length ? <span>PIC: {picNames.join(", ")}</span> : null}
        </div>
        <SectionHeaderActions decisions={decisions} onDecisionOpen={onDecisionOpen} />
      </header>

      <div className={styles.menuList}>
        {sections.map((section) => (
          <article className={styles.menuGroup} key={section.id}>
            <div className={styles.menuTitle}>
              <Utensils size={18} aria-hidden="true" />
              <h3>{section.title}</h3>
            </div>
            <div className={styles.menuItems}>
              {section.items.map((item) => (
                <div className={styles.menuItem} key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                  {item.assignedPerson ? <span>Assigned: {item.assignedPerson}</span> : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
