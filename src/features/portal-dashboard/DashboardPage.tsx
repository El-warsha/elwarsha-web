import { messages, type Locale } from "@core/i18n";
import { assignmentFixture } from "@core/catalog/fixtures";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

export function DashboardPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.portal.title} title={copy.portal.dashboard}>
      <p>
        {assignmentFixture.weekNumber}. {assignmentFixture.title}
      </p>
      <StatePanel title={copy.portal.unavailable} body={copy.tagline} />
    </PageSection>
  );
}
