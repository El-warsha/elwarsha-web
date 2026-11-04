import { api } from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { ButtonLink } from "@ui/components/Button/Button";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function SignedOutPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <PageSection
      eyebrow={copy.portal.title}
      title={copy.portal.signInTitle}
    >
      <ButtonLink href={api.loginUrl({ locale })}>
        {copy.portal.logIn}
      </ButtonLink>
    </PageSection>
  );
}