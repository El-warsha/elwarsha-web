import { Navigate } from "react-router-dom";

import { useLocaleStore } from "@core/i18n";

export function RootRedirect() {
  const locale = useLocaleStore((state) => state.locale);
  return <Navigate to={`/${locale}/`} replace />;
}
