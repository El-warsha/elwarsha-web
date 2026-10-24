import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";

import { CohortHeaderBar } from "./components/CohortHeaderBar.js";
import { LockedWeekCard } from "./components/LockedWeekCard.js";
import { WeekCard } from "./components/WeekCard.js";
import { useCohortWeeks } from "./useCohortWeeks.js";
import styles from "./WeeksPage.module.css";

export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortSlug = "cohort-01" } = useParams();
  const { data, isLoading, isError } = useCohortWeeks(cohortSlug, locale);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>{copy.portal.loading}</p>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.error} role="alert">
          {copy.error}
        </p>
      </div>
    );
  }

  const firstWeek = data[0];
  const cohort = firstWeek.cohort;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>

      <CohortHeaderBar cohort={cohort} locale={locale} />

      <section className={styles.grid}>
        {data.map((week) =>
          week.isLocked ? (
            <LockedWeekCard key={week.weekNumber} week={week} locale={locale} />
          ) : (
            <WeekCard key={week.weekNumber} week={week} locale={locale} />
          ),
        )}
      </section>
    </div>
  );
}
