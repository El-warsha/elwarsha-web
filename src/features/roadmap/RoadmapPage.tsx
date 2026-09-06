import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function RoadmapPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  return (
    <PageSection eyebrow={copy.nav.roadmap} title={copy.roadmap.title}>
      <ol>
        {copy.roadmap.weeks.map((week, index) => (
          <li key={week}>
            {String(index + 1).padStart(2, "0")} — {week}
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
