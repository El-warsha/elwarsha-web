import styles from "../WeekDetailPage.module.css";

export interface WeekConceptsGridProps {
  coreConcepts: string[];
  title: string;
}

export function WeekConceptsGrid({ coreConcepts, title }: WeekConceptsGridProps) {
  if (coreConcepts.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.conceptsGrid}>
        {coreConcepts.map((concept, idx) => (
          <div key={idx} className={styles.conceptCard}>
            <span className={styles.conceptDot} aria-hidden="true">
              •
            </span>
            <span>{concept}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
