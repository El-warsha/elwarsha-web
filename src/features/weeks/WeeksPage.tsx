import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import { useCohortWeeks } from "./useCohortWeeks.js";
import { CohortHeaderBar } from "./components/CohortHeaderBar.js";
import { WeekCard } from "./components/WeekCard.js";
import { LockedWeekCard } from "./components/LockedWeekCard.js";
import styles from "./WeeksPage.module.css";

export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortSlug = "cohort-01" } = useParams();

  const {
    data: weeks,
    isLoading,
    isError,
    error,
  } = useCohortWeeks(cohortSlug, locale);

  if (isLoading) {
    return (
      <PageSection eyebrow={copy.portal.title} title={copy.portal.loading}>
        <StatePanel title={copy.portal.loading} body="" />
      </PageSection>
    );
  }

  if (isError || !weeks || weeks.length === 0) {
    return (
      <main className={styles.page}>
        <PageSection eyebrow={copy.portal.title} title={copy.portal.weekNotFound}>
          <StatePanel
            title={copy.portal.weekNotFound}
            body={error instanceof Error ? error.message : copy.portal.weekNotFoundBody}
          />
        </PageSection>
      </main>
    );
  }

  const cohort = weeks[0]?.cohort;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>

      {cohort && <CohortHeaderBar cohort={cohort} locale={locale} />}

      <div className={styles.weeksGrid} data-testid="weeks-grid">
        {weeks.map((week) =>
          week.isLocked ? (
            <LockedWeekCard key={week.weekNumber} week={week} locale={locale} />
          ) : (
            <WeekCard key={week.weekNumber} week={week} locale={locale} />
          ),
        )}
      </div>
    </div>
  );
}
