import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import styles from "./WeeksPage.module.css";

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
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            margin: "0 0 var(--space-2)",
            color: "var(--color-text-primary)",
          }}
        >
          {locale === "ar"
            ? "مهمة الأسبوع الثالث: بناء صفحة ملخص الأسابيع"
            : "Week 3 Assignment: Build the Weeks Summary Page"}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "60ch",
            margin: "0 auto var(--space-4)",
          }}
        >
          {locale === "ar"
            ? "قم بالاتصال بالخادم باستخدام React Query والتحقق من صحة البيانات باستخدام Zod، وبناء بطاقات الأسابيع بمكونات منفصلة."
            : "Connect to the backend with React Query, validate the response with Zod, and render the weekly cards with separate components."}
        </p>
        <div
          style={{
            display: "inline-block",
            textAlign: "start",
            background: "var(--color-surface-default, #fff)",
            padding: "var(--space-4)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-default)",
          }}
        >
          <h3 style={{ margin: "0 0 var(--space-2)", fontSize: "0.95rem", fontWeight: 700 }}>
            {locale === "ar" ? "قائمة متطلبات المهمة:" : "Assignment Checklist:"}
          </h3>
          <ul
            style={{
              margin: 0,
              paddingInlineStart: "1.2rem",
              lineHeight: 1.8,
              fontSize: "0.9rem",
            }}
          >
            <li>Migrate DB in <code>elwarsha-api</code> (add <code>currentWeekNumber</code>)</li>
            <li>Implement <code>useCohortWeeks(cohortSlug, locale)</code> in <code>useCohortWeeks.ts</code></li>
            <li>Create <code>CohortHeaderBar.tsx</code> (1 component per file)</li>
            <li>Create <code>WeekCard.tsx</code> and <code>LockedWeekCard.tsx</code></li>
            <li>Render the cards grid here in <code>WeeksPage.tsx</code></li>
            <li>Add unit tests in <code>WeeksPage.test.tsx</code></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
