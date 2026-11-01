
import { api } from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { ButtonLink } from "@ui/components/Button/Button";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

type SignedOutScreenProps = {
  locale: Locale;
};

export function SignedOutScreen({ locale }: SignedOutScreenProps) {
  const copy = messages[locale];

  return (
    <PageSection
      eyebrow={copy.portal.title}
      title={copy.portal.signInTitle}
    >
      <p>
        {locale === "ar"
          ? "سجّل الدخول للوصول إلى بوابة المتدربين."
          : "Sign in to access the trainee portal."}
      </p>

      <ButtonLink href={api.loginUrl({ locale })}>
        {copy.portal.logIn}
      </ButtonLink>
    </PageSection>
  );
}
