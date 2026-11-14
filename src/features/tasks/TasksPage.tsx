import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./useTasks.js";
import { SubmissionStatusCard } from "@features/submissions/components/SubmissionStatusCard.js";
import { useParams } from "react-router-dom";

export function TasksPage({ locale }: { locale: Locale }) {
   const { cohortSlug } = useParams()
  const copy = messages[locale];
  const { tasks } = useTasks();
  const task = tasks?.[0];

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
      {task ? (
        <div>
          <SubmissionStatusCard
            cohortSlug={cohortSlug ?? "cohort-01"}
            weekNumber={String(task.weekNumber)}
            locale={locale}
          />
          <p>
            {copy.portal.week} {task.weekNumber}
          </p>
        </div>
      ) : null}
    </PageSection>
  );
}
