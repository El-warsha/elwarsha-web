import { messages, type Locale } from "@core/i18n";
import { Text } from "@ui/primitives/Text";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function InitiativePage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection 
  eyebrow={copy.nav.initiative} 
  title={
    locale === "ar" ? (
      <>
        مبادرة،
        مش كورس.
      </>
    ) : (
      <>
        An initiative,
        <br />
        not a course.
      </>
    )
  }
>
  <Text>
    <span className="brand-highlight">
      {locale === "ar" ? "الورشة" : "ElWarsha"}
    </span>{" "}
    {copy.initiative.body}
  </Text>
</PageSection>
  );
}
