import { Link } from "react-router-dom";
import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { Button } from "@ui/components/Button/Button";

export function ParticipationPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <PageSection eyebrow={copy.nav.participation} title={copy.participation.title}>
      <ol>
        {copy.participation.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div style={{ marginTop: "var(--space-4)" }}>
        <Link to={`/${locale}/apply/`} style={{ textDecoration: "none" }}>
          <Button>{copy.nav.apply}</Button>
        </Link>
      </div>
    </PageSection>
  );
}
