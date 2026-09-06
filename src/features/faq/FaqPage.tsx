import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function FaqPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.nav.faq} title={copy.faq.title}>
      {copy.faq.items.map((item) => (
        <article key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </article>
      ))}
    </PageSection>
  );
}
