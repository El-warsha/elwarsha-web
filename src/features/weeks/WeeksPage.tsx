import { Link, useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import styles from "./WeeksPage.module.css";
import CohortHeaderBar from "./components/CohortHeaderBar";
import LockedWeekCard from "./components/LockedWeekCard";
import WeekCard from "./components/WeekCard";
import { useCohortWeeks } from "./useCohortWeeks";

export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortSlug = "cohort-01" } = useParams();

  const { data: weeks, isLoading, isError, error } = useCohortWeeks(cohortSlug, locale);
  const cohort = weeks?.[0]?.cohort;

   if (isLoading) {
    return (
      <PageSection eyebrow={copy.portal.title} title={copy.portal.loading}>
        <StatePanel title={copy.portal.loading} body="" />
      </PageSection>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <Link to={`/${locale}/portal/cohorts`} className={styles.backLink}>
          <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
          <span>{copy.portal.cohorts}</span>
        </Link>
        <PageSection eyebrow={copy.portal.title} title={copy.error}>
          <StatePanel
            title={copy.error}
            body={error instanceof Error ? error.message : copy.error }
          />
        </PageSection>
      </main>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>
      
      <CohortHeaderBar 
        cohortName={cohort?.name || "Cohort 01"}
        cohortStartDate={cohort?.startsOn || "Jan 1, 2024"}
        cohortEndDate={cohort?.endsOn || "Mar 31, 2024"}
        cohortCurrentWeek={cohort?.currentWeekNumber || 1}
        copy={copy}
      />

      <section className={styles.weeksGrid}>
        {weeks?.map((week) => 
          week.isLocked? <LockedWeekCard key={week.weekNumber} week={week} copy={copy}/> :
          <WeekCard key={week.weekNumber} cohortSlug={cohortSlug} week={week} copy={copy} locale={locale} />
        )}
      </section>
    </div>
  );
}
