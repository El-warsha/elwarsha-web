import { Link, useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import styles from "./WeeksPage.module.css";
import { CohortHeaderBar } from "./components/cohortHeader/CohortHeaderBar";
import { useCohortWeeks } from "./useCohortWeeks";
import { WeekCard } from "./components/weekCard/WeekCard";
import { LockedWeekCard } from "./components/weekCard/lockedWeekCard";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

/**
 * Week 3 Assignment: Weeks Summary Page
 *
 * 2. Data fetching: Implement `useCohortWeeks(cohortSlug, locale)` in `useCohortWeeks.ts` using
 *    TanStack React Query (`useQuery`) and validate data with Zod schemas in `weeks.schema.ts`.
 * 3. Components (1 component per file):
 *    - `CohortHeaderBar.tsx`: Displays cohort title, start/end dates, and current week progress.
 *    - `WeekCard.tsx`: Displays an unlocked week card with badges, concept, and link to detail page.
 *    - `LockedWeekCard.tsx`: Displays a locked week card with padlock icon and disabled link.
 * 4. WeeksPage: Consume `useCohortWeeks`, render loading and error states, and map the cards.
 * 5. Testing: Add test coverage in `WeeksPage.test.tsx`.
 *
 * Reference:
 * Inspect `WeekDetailPage.tsx` and `useCohortWeekDetail.ts` for an end-to-end working example.
 */
export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortSlug = "cohort-01" } = useParams();
  const { data: weeks, isLoading, isError } = useCohortWeeks(cohortSlug, locale);
  const cohort = weeks?.[0]?.cohort;

  if (isLoading) {
   return (
     <main className={styles.page}>
      <Link
        to={`/${locale}/portal/cohorts`}
        className={styles.backLink}
      >
        <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
        <span>{copy.portal.cohorts}</span>
      </Link>
      <StatePanel title={copy.portal.loading} body="" />
    </main>
   );
 }

 if (isError || !weeks) {
  return (
    <main className={styles.page}>
      <Link
        to={`/${locale}/portal/cohorts/${cohortSlug}/weeks`}
        className={styles.backLink}
      >
        <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
        <span>{copy.portal.backToWeeks}</span>
      </Link>
      
        <StatePanel
          title={copy.error}
          body={copy.portal.weekNotFoundBody}
        />
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

    {!isLoading && !isError && (
      <>
        {cohort && (
          <CohortHeaderBar
            cohortSlug={cohortSlug}
            copy={copy}
            cohort={cohort}
          />
        )}

        {weeks && weeks.length > 0 ? (
          <div className={styles.weeksGrid}>
            {weeks.map((week) =>
              week.status === "upcoming" ? (
                <LockedWeekCard
                  key={week.weekNumber}
                  copy={copy}
                  week={week}
                />
              ) : (
                <WeekCard
                  key={week.weekNumber}
                  copy={copy}
                  week={week}
                />
              ),
            )}
          </div>
        ) : (
          <p>{copy.portal.empty}</p>
        )}
      </>
    )}
  </div>
  );
}
