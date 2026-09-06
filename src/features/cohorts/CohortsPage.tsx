import { messages, type Locale } from "@core/i18n";
import { engagementFixture } from "@core/catalog/fixtures";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function CohortsPage({ locale }: { locale: Locale }) {
  return (
    <PageSection
      eyebrow={messages[locale].portal.cohorts}
      title={engagementFixture.cohort.name}
    >
      <p>
        {engagementFixture.cohort.startsOn} — {engagementFixture.cohort.endsOn}
      </p>
    </PageSection>
  );
}
