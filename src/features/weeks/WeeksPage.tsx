import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import styles from "./WeeksPage.module.css";
import { useCohortWeeks } from "./hooks/useCohortWeeks";
import { WeekCard } from "./components/week-card/WeekCard";
import { Week } from "./validations/weeks.schema";
import { CohortHeaderBar } from "./components/cohort-header-bar/CohortHeaderBar";
import { LockedWeekCard } from "./components/locked-week-card/LockedWeekCard";

/**
 * Week 3 Assignment: Weeks Summary Page
 *
 * Requirements:
 * 1. Backend: In elwarsha-api, add `currentWeekNumber Int @default(1)` to the Cohort model,
 *    run `prisma migrate dev --name add_cohort_current_week`, and wire it into WeeksService.
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
  const { data: weeks, isPending, error } = useCohortWeeks(cohortSlug, locale);

  if (isPending) {
    return <section className={styles.error}>{copy.portal.loading}</section>;
  }

  if (error) {
    return <section className={styles.error}>{copy.error}</section>;
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>

      <section
        style={{
          padding: "var(--space-6) var(--space-4)",
          background: "var(--color-surface-muted)",
          border: "2px dashed var(--color-border-default)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
        }}
      >
        <CohortHeaderBar
          cohortName={cohortSlug}
          currentWeekNumber={weeks[0].cohort.currentWeekNumber}
          locale={locale}
          startDate={weeks[0].cohort.startsOn}
          endDate={weeks[0].cohort.endsOn}
        ></CohortHeaderBar>
          <div className={styles.cardsContainer}>
        {weeks?.map((week: Week) => {
          if(week.isLocked){
return <LockedWeekCard
            key={week.title}
            locale={locale}
            // status={week.status}
            title={week.title}
            weekNumber={week.weekNumber}
            concept={week.concept}
          ></LockedWeekCard>}
          if(week.status==='active'||week.status==='completed'){
            return <WeekCard
            key={week.title}
            locale={locale}
            status={week.status}
            title={week.title}
            weekNumber={week.weekNumber}
            concept={week.concept}
          ></WeekCard>}
          
        
      
      })
      }
        </div>

   
      </section>
    </div>
  );
}
