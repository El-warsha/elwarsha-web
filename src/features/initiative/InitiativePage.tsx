import { messages, type Locale } from "@core/i18n";
import { Text } from "@ui/primitives/Text";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function InitiativePage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.nav.initiative} title={copy.initiative.title}>
      <Text>{copy.initiative.body}</Text>
    </PageSection>
  );
}
