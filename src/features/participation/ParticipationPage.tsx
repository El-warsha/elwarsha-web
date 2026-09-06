import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function ParticipationPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.nav.participation} title={copy.participation.title}>
      <ol>
        {copy.participation.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </PageSection>
  );
}
