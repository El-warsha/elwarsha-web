import { useOutletContext } from "react-router-dom";

import type { Locale } from "@core/i18n";
import { HomePage } from "@features/home/HomePage";

export function LocaleHome() {
  const locale = useOutletContext<Locale>();
  return <HomePage locale={locale} />;
}
