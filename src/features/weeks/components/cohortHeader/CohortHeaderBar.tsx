import type { messages, Locale } from "@core/i18n";
import type { CohortRef } from "../../weeks.schema";
import styles from "./cohortHeader.module.css";

export interface WeekHeaderProps {
  cohortSlug: string;
  cohort: CohortRef;
  copy: (typeof messages)[Locale];
}

export function CohortHeaderBar({
  copy,
  cohort
}: WeekHeaderProps) {
  return (
    <>
    <header className={styles.header}>
        <p className={styles.eyebrow}>
          {cohort.name} • {copy.portal.week} {cohort.currentWeekNumber}
        </p>
        <div className={styles.metaRow}>
          <span className={`${styles.pill} ${styles.pillActive}`}>
            <span>{copy.portal.currentWeek} {cohort.currentWeekNumber}</span>
          </span>
          <span className={styles.pill}>
            <span>
              {cohort.startsOn} — {cohort.endsOn}
            </span>
          </span>
        </div>
      </header>
    </>
  );
}