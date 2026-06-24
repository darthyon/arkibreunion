import { MapPin } from "lucide-react";
import type { ProgramItem } from "@/types/view-plan";
import styles from "./ViewPlanPage.module.css";

type ProgramSectionProps = {
  items: ProgramItem[];
  picNames: string[];
};

export function ProgramSection({ items, picNames }: ProgramSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <p>01</p>
        <div className={styles.sectionTitle}>
          <h2>Program</h2>
          {picNames.length ? <span>PIC: {picNames.join(", ")}</span> : null}
        </div>
      </header>

      <ol className={styles.timeline}>
        {items.map((item) => (
          <li className={styles.timelineItem} key={item.id}>
            <div className={styles.timeBlock}>
              <span>Hari {item.dayNumber}</span>
              <strong>{item.time}</strong>
            </div>
            <div className={styles.timelineContent}>
              <h3>{item.title}</h3>
              {item.location ? (
                <p className={styles.location}>
                  <MapPin size={15} aria-hidden="true" />
                  {item.location}
                </p>
              ) : null}
              {item.notes ? <p>{item.notes}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
