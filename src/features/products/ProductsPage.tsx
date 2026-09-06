import { messages, type Locale } from "@core/i18n";
import { productFixture } from "@core/catalog/fixtures";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function ProductsPage({ locale }: { locale: Locale }) {
  return (
    <PageSection eyebrow={messages[locale].portal.products} title={productFixture.name}>
      <p>
        {productFixture.repository?.githubOwner}/{productFixture.repository?.githubRepo}
      </p>
    </PageSection>
  );
}
