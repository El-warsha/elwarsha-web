import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import styles from "./WeeksPage.module.css";
import { useCohortWeeks } from "./useCohortWeeks";
import { CohortHeaderBar } from "./components/CohortHeaderBar";
import { WeekCard } from "./components/WeekCard";
import { LockedWeekCard } from "./components/LockedWeekCard";

export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortSlug = "cohort-01" } = useParams();
  const { data, isPending, isError, error } = useCohortWeeks(cohortSlug, locale);



  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const cohort = data?.[0]?.cohort;

  if (!cohort) {
  return <p>No cohort data available.</p>;
}
  


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>

      <CohortHeaderBar
        cohortName={(locale === "ar" ? cohort.nameAr : cohort.name) ?? cohort.name}
        startDate={cohort.startsOn}
        endDate={cohort.endsOn}
        currentWeek={cohort.currentWeekNumber}
      />

      <section className={styles.weeksGrid}>
        {data.filter((week) =>
          !week.isLocked)
          .map((week) =>
            <WeekCard
              key={week.weekNumber}
              weekNumber={week.weekNumber}
              title={week.title}
              concept={week.concept}
              status={week.status}
              isCurrent={week.isCurrent}
              cohortSlug = {cohortSlug}
              locale ={locale}

            />

          )}

          {
            data.filter((week)=>
            week.isLocked).map((week)=>
            <LockedWeekCard
            weekNumber={week.weekNumber}
            title={week.title}
            concept={week.concept}
            status={week.status}
            />
          )
          }
      </section>

    </div>
  );
}
