
import type { CohortRef } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

interface CohortHeaderBarProps {
  cohort: CohortRef;
  locale: "ar" | "en";
}

export function CohortHeaderBar({
  cohort,
  locale,
}: CohortHeaderBarProps) {
  const currentWeekLabel =
    locale === "ar" ? "الأسبوع الحالي" : "Current Week";

  return (
    <section className={styles.cohortBar}>
      <div className={styles.cohortInfo}>
        <span className={styles.cohortName}>{cohort.name}</span>

        <span className={styles.cohortDates}>
          {cohort.startsOn} — {cohort.endsOn}
        </span>
      </div>

      <span className={`${styles.statusPill} ${styles.statusActive}`}>
        {currentWeekLabel}: {cohort.currentWeekNumber}
      </span>
    </section>
  );
}
