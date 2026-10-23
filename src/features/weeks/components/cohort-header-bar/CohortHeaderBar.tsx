import { messages, type Locale } from "@core/i18n";
import styles from "./CohortHeaderBar.module.css";

type CohortHeaderBarProps = {
  locale: Locale;
  cohortName: string;
  startDate: string;
  endDate: string;
  currentWeekNumber: number;
};

export function CohortHeaderBar({
  locale,
  cohortName,
  startDate,
  endDate,
  currentWeekNumber,
}: CohortHeaderBarProps) {
  const t = messages[locale].portal.weeksPage.cohortHeaderBar;

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>

        <h1 className={styles.title}>{cohortName}</h1>

        <p className={styles.dateRange}>
          <time dateTime={startDate}>{startDate}</time>
          <span aria-hidden="true"> — </span>
          <time dateTime={endDate}>{endDate}</time>
        </p>
      </div>

      <div className={styles.currentWeek}>
        <span className={styles.currentWeekLabel}>
          {t.currentWeek}
        </span>

        <span className={styles.weekNumber}>
          {currentWeekNumber}
        </span>
      </div>
    </header>
  );
}