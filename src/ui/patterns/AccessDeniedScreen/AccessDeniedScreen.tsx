
import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

type AccessDeniedScreenProps = {
  locale: Locale;
};

export function AccessDeniedScreen({
  locale,
}: AccessDeniedScreenProps) {
  const copy = messages[locale].portal;

  return (
    <PageSection
      eyebrow={copy.title}
      title={locale === "ar" ? "غير مسموح بالوصول" : "Access Denied"}
    >
      <StatePanel
        title={locale === "ar" ? "ليس لديك صلاحية الوصول" : "You don't have permission to access this page"}
        body={locale === "ar"
          ? "حسابك لا يمتلك الصلاحيات المطلوبة لعرض هذه الصفحة."
          : "Your account doesn't have the required permission to view this page."}
      />
    </PageSection>
  );
}
