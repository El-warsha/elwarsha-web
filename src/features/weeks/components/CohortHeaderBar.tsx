import { messages, type Locale } from "@core/i18n";
import type { CohortRef } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

export interface CohortHeaderBarProps {
  cohort: CohortRef;
  locale: Locale;
}

export function CohortHeaderBar({ cohort, locale }: CohortHeaderBarProps) {
  const copy = messages[locale];
  const cohortDisplayName =
    locale === "ar" && cohort.nameAr ? cohort.nameAr : cohort.name;

  return (
    <div className={styles.cohortBar} data-testid="cohort-header-bar">
      <div className={styles.cohortInfo}>
        <span className={styles.cohortName}>{cohortDisplayName}</span>
        <span className={styles.cohortDates}>
          {cohort.startsOn} — {cohort.endsOn}
        </span>
      </div>
      <div>
        <span className={`${styles.statusPill} ${styles.statusActive}`}>
          {copy.portal.currentWeek}: {cohort.currentWeekNumber} / 8
        </span>
      </div>
    </div>
  );
}

