import type { messages, Locale } from "@core/i18n";
import styles from "../WeekDetailPage.module.css";
import type { CohortRef as Cohort } from "../weeks.schema.js";

export interface CohortHeaderBarProps {
  Cohort: Cohort;
  locale: Locale;
  copy: (typeof messages)[Locale];
}

export function CohortHeaderBar({ Cohort, locale, copy }: CohortHeaderBarProps) {
  const cohortName = locale === "ar" && Cohort.nameAr ? Cohort.nameAr : Cohort.name;

  return (
    <header className={styles.header}>
       <p className={styles.eyebrow}>
        Cohort • Week {Cohort.currentWeekNumber}
      </p>

       <h1>{cohortName}</h1>

       <div className={styles.metaRow}>
        <span className={styles.pill}>
          <span>🗓</span>
          <span>{Cohort.startsOn} — {Cohort.endsOn}</span>
        </span>
      </div>
    </header>
  );
}