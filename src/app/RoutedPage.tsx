import { useOutletContext } from "react-router-dom";

import type { Locale } from "@core/i18n";
import type { RouteDescriptor } from "@core/navigation/types";

export function RoutedPage({ route }: { route: RouteDescriptor }) {
  const locale = useOutletContext<Locale>();
  const Page = route.element;
  return <Page locale={locale} />;
}
