import { Locale, messages } from "@core/i18n";
import { SessionContext } from "@core/session/SessionContext";
import { Capability } from "@elwarsha/api-client";
import { AccessDeniedScreen } from "@ui/patterns/AccessDeniedScreen/AccessDeniedScreen";
import { SignedOutScreen } from "@ui/patterns/SignedOutScreen/SignedOutScreen";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  capability?: Capability;
};

export default function ProtectedRoute({
  children,
  capability,
}: ProtectedRouteProps) {
 const { locale } = useParams();

const lang: Locale =
  locale === "ar" || locale === "en" ? locale : "en";
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("ProtectedRoute must be used within SessionProvider");
  }
  const copy = messages[lang].portal;

  if (context.status == "loading") return <h2>{copy.loading}</h2>;
  else if (context.status == "unauthenticated") {
    return <SignedOutScreen locale={lang} />;
  }
    else if (context.error?.status==403) {
 return <AccessDeniedScreen locale={lang} />
  }
  if (context.status === "authenticated") {
    const hasCapability =
      capability === undefined || context.session.capabilities.includes(capability);

    if (!hasCapability ) {
 return<>
 <p> capabilities{...context.session.capabilities},
  roles {...context.session.roles}

  ,

 </p>
 <AccessDeniedScreen locale={lang} />
 </>

  
    }

    return <>{children}</>;
  }
}
