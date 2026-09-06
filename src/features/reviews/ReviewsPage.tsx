import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

export function ReviewsPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.portal.reviews} title={copy.portal.empty}>
      <StatePanel title={copy.portal.unavailable} body={copy.portal.empty} />
    </PageSection>
  );
}
