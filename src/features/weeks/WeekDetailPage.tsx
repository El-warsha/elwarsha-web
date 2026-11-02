import { Link, useParams } from "react-router-dom";

import { isLocale, messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import { useCohortWeekDetail } from "./useCohortWeekDetail.js";
import { WeekLockedView } from "./components/WeekLockedView.js";
import { WeekHeader } from "./components/WeekHeader.js";
import { WeekOutcomesList } from "./components/WeekOutcomesList.js";
import { WeekConceptsGrid } from "./components/WeekConceptsGrid.js";
import { WeekStackGrid } from "./components/WeekStackGrid.js";
import { WeekAssignmentCard } from "./components/WeekAssignmentCard.js";
import { WeekResourcesSection } from "./components/WeekResourcesSection.js";
import { WeekReflectionSection } from "./components/WeekReflectionSection.js";
import { WeekPagination } from "./components/WeekPagination.js";

import styles from "./WeekDetailPage.module.css";

export function WeekDetailPage() {
  const { locale, cohortSlug = "cohort-01", weekNumber = "1" } = useParams<{
    locale?: string;
    cohortSlug?: string;
    weekNumber?: string;
  }>();

  const currentLocale: Locale = isLocale(locale) ? locale : "ar";
  const copy = messages[currentLocale] || messages["ar"];
  const weekNum = parseInt(weekNumber, 10);

  const {
    data: week,
    isLoading,
    isError,
    error,
  } = useCohortWeekDetail(cohortSlug, weekNum, currentLocale);

  if (isLoading) {
    return (
      <PageSection eyebrow={copy.portal?.title || "Portal"} title={copy.portal?.loading || "Loading..."}>
        <StatePanel title={copy.portal?.loading || "Loading..."} body="" />
      </PageSection>
    );
  }

  if (isError || !week) {
    return (
      <main className={styles.page}>
        <Link
          to={`/${currentLocale}/portal/cohorts/${cohortSlug}/weeks`}
          className={styles.backLink}
        >
          <span aria-hidden="true">{currentLocale === "ar" ? "→" : "←"}</span>
          <span>{copy.portal?.backToWeeks || "Back to weeks"}</span>
        </Link>
        <PageSection eyebrow={copy.portal?.title || "Portal"} title={copy.portal?.weekNotFound || "Week not found"}>
          <StatePanel
            title={copy.portal?.weekNotFound || "Week not found"}
            body={error instanceof Error ? error.message : (copy.portal?.weekNotFoundBody || "Could not load week details.")}
          />
        </PageSection>
      </main>
    );
  }

  if (week.isLocked || week.status === "upcoming") {
    return (
      <WeekLockedView
        week={week}
        cohortSlug={cohortSlug}
        weekNum={weekNum}
        locale={currentLocale}
        copy={copy}
      />
    );
  }

  return (
    <main className={styles.page}>
      <Link
        to={`/${currentLocale}/portal/cohorts/${cohortSlug}/weeks`}
        className={styles.backLink}
      >
        <span aria-hidden="true">{currentLocale === "ar" ? "→" : "←"}</span>
        <span>{copy.portal?.backToWeeks || "Back to weeks"}</span>
      </Link>

      <WeekHeader week={week} copy={copy} />

      <WeekOutcomesList
        outcomes={week.outcomes}
        title={copy.portal?.learningOutcomes || "Learning Outcomes"}
      />

      <WeekConceptsGrid
        coreConcepts={week.coreConcepts}
        title={copy.portal?.coreConcepts || "Core Concepts"}
      />

      <WeekStackGrid
        appliedThroughTheStack={week.appliedThroughTheStack}
        title={copy.portal?.appliedThroughTheStack || "Applied Through The Stack"}
      />

      {week.assignment && (
        <WeekAssignmentCard assignment={week.assignment} copy={copy} />
      )}

      <WeekResourcesSection resources={week.resources} copy={copy} />

      <WeekReflectionSection
        reflectionQuestion={week.reflectionQuestion}
        prerequisites={week.prerequisites}
        copy={copy}
      />

      <WeekPagination
        cohortSlug={cohortSlug}
        weekNum={weekNum}
        locale={currentLocale}
        copy={copy}
      />
    </main>
  );
}