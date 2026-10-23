import { messages, type Locale } from "@core/i18n";

import type { CohortRef } from "../weeks.schema.js";
import styles from "./CohortHeaderBar.module.css";

export interface CohortHeaderBarProps {
  cohort: CohortRef;
  locale: Locale;
}

export function CohortHeaderBar({ cohort, locale }: CohortHeaderBarProps) {
  const copy = messages[locale].portal;

  return (
    <header className={styles.bar}>
      <div className={styles.info}>
        <p className={styles.label}>{copy.cohortLabel}</p>
        <h1 className={styles.name}>{cohort.name}</h1>
        <p className={styles.range}>
          {cohort.startsOn} → {cohort.endsOn}
        </p>
      </div>

      <div className={styles.badge} aria-label={copy.currentWeek}>
        <span className={styles.badgeLabel}>{copy.currentWeek}</span>
        <span className={styles.badgeValue}>{cohort.currentWeekNumber}</span>
      </div>
    </header>
  );
}
