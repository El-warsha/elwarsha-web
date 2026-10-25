import type { messages, Locale } from "@core/i18n";
import styles from "../WeekDetailPage.module.css";

export interface WeekReflectionSectionProps {
  reflectionQuestion?: string;
  prerequisites: string[];
  copy: (typeof messages)[Locale];
}

export function WeekReflectionSection({
  reflectionQuestion,
  prerequisites,
  copy,
}: WeekReflectionSectionProps) {
  if (!reflectionQuestion && prerequisites.length === 0) return null;

  return (
    <section className={styles.section}>
      {reflectionQuestion && (
        <div className={styles.reflectionBox}>
          <strong>{copy.portal.reflection}</strong>
          <p>{reflectionQuestion}</p>
        </div>
      )}

      {prerequisites.length > 0 && (
        <div className={styles.metaList}>
          <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
            {copy.portal.prerequisites}:
          </span>
          {prerequisites.map((prereq) => (
            <span key={prereq} className={styles.metaTag}>
              {prereq}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
