import type { WeekAppliedLayer } from "../weeks.schema.js";
import styles from "../WeekDetailPage.module.css";

export interface WeekStackGridProps {
  appliedThroughTheStack: WeekAppliedLayer[];
  title: string;
}

export function WeekStackGrid({ appliedThroughTheStack, title }: WeekStackGridProps) {
  if (appliedThroughTheStack.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.stackGrid}>
        {appliedThroughTheStack.map((item) => (
          <div key={item.layer} className={styles.stackCard}>
            <div className={styles.stackLayerBadge}>{item.layer}</div>
            <p className={styles.stackDetails}>{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
