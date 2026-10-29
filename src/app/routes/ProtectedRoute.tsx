
import { useSession } from "@core/session";
import { Outlet, useParams } from "react-router-dom";
import { messages, type Locale } from "@core/i18n";

import { SignedOutPage } from "../../ui/patterns/SignOut/SignedOutPage";

export function ProtectedRoute(){
  const { locale: routeLocale } = useParams();
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const copy = messages[locale];
  const session = useSession();

  if (session.status === "loading") {
    return (
      <p role="status" aria-live="polite" aria-busy="true">
        {copy.portal.loading}
      </p>
    );
  }

  if (session.status === "unauthenticated") {
    return <SignedOutPage />;
  }


  return <Outlet context={locale} />;
}
