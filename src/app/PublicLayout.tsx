import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { isLocale, localeDirection, useLocaleStore, type Locale } from "@core/i18n";
import { SiteFooter } from "@ui/patterns/SiteFooter/SiteFooter";
import { SiteHeader } from "@ui/patterns/SiteHeader/SiteHeader";

export function PublicLayout() {
  const params = useParams();
  const location = useLocation();
  if (!isLocale(params.locale)) {
    const suffix = location.pathname.split("/").slice(2).join("/");
    return <Navigate to={`/ar/${suffix}`} replace />;
  }

  return <LocalizedLayout locale={params.locale} />;
}

function LocalizedLayout({ locale }: { locale: Locale }) {
  const navigate = useNavigate();
  const location = useLocation();
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    setLocale(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirection(locale);
    document.documentElement.dataset.theme = "workshop";
  }, [locale, setLocale]);

  return (
    <>
      <SiteHeader
        locale={locale}
        onToggleLocale={() => {
          const nextLocale = locale === "ar" ? "en" : "ar";
          navigate({
            pathname: location.pathname.replace(/^\/[^/]+/, `/${nextLocale}`),
            search: location.search,
            hash: location.hash,
          });
        }}
      />
      <Outlet context={locale} />
      <SiteFooter locale={locale} />
    </>
  );
}
