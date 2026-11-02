import styles from "../WeekDetailPage.module.css";

export interface WeekOutcomesListProps {
  outcomes: string[];
  title: string;
}

export function WeekOutcomesList({ outcomes, title }: WeekOutcomesListProps) {
  if (outcomes.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.outcomesList}>
        {outcomes.map((outcome, idx) => (
          <li key={idx} className={styles.outcomeItem}>
            <span className={styles.checkIcon} aria-hidden="true">
              ✓
            </span>
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
