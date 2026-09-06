import { messages, type Locale } from "@core/i18n";
import { assignmentFixture } from "@core/catalog/fixtures";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function AssignmentsPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.portal.assignments} title={assignmentFixture.title}>
      <p>
        {copy.portal.week} {assignmentFixture.weekNumber}
      </p>
    </PageSection>
  );
}
