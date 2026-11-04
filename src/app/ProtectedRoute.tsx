import { useOutletContext } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { useSession } from "@core/session";
import type { RouteDescriptor } from "@core/navigation/types";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

import { SignedOutPage } from "./routes/SignedOutPage.js";
import { DeniedPage } from "./routes/DeniedPage.js";

export function ProtectedRoute({
  route,
  children,
}: {
  route: RouteDescriptor;
  children: React.ReactNode;
}) {
  const locale = useOutletContext<Locale>();
  const copy = messages[locale];
  const sessionState = useSession();

  if (route.public) {
    return <>{children}</>;
  }

  if (sessionState.status === "loading") {
    return (
      <StatePanel title={copy.portal.loading} body="" />
    );
  }

  if (sessionState.status === "unauthenticated") {
    return <SignedOutPage locale={locale} />;
  }

  if (sessionState.status === "error") {
    return (
      <div role="alert">
        {locale === "ar"
          ? "حدث خطأ أثناء تحميل بيانات تسجيل الدخول."
          : "An error occurred while loading your session."}
      </div>
    );
  }

  if (
    route.capability &&
    !sessionState.session.capabilities.includes(route.capability)
  ) {
    return <DeniedPage locale={locale} />;
  }

  return <>{children}</>;
}