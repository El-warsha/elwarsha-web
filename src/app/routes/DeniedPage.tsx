import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

export function DeniedPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <PageSection
      eyebrow={copy.portal.title}
      title={locale === "ar" ? "غير مسموح بالدخول" : "Access denied"}
    >
      <div role="alert">
        {locale === "ar"
          ? "ليس لديك الصلاحية المطلوبة لعرض هذه الصفحة."
          : "You do not have permission to view this page."}
      </div>
    </PageSection>
  );
}