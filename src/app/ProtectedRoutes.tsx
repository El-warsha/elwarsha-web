import { Locale, messages } from "@core/i18n";
import { useSession } from "@core/session";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import { Outlet, useOutletContext } from "react-router";
import AccessDeniedScreen from "./screens/AccessDeniedScreen";
import SignedoutScreen from "./screens/SignedoutScreen";

const ProtectedRoutes = ( ) => {
    const { status, session } = useSession();

    const locale = useOutletContext<Locale>();
    const copy = messages[locale]

    if(status === "loading") {
      return (
        <div role="status" aria-live="polite">
          <PageSection eyebrow={copy.portal.title} title={copy.portal.loading}>
            <StatePanel title={copy.portal.loading} body="" />
          </PageSection>
        </div>
      );
    }

    if (status === "unauthenticated") {
      return <SignedoutScreen />
    }
   
    if (status === "authenticated") {
      const isAdminOrMaintainer = session.roles?.includes("admin") || session.roles?.includes("maintainer");
      const hasPortalCapability = session.capabilities?.includes("portal.view");
      const hasMembership = session.memberships?.length > 0;
      
      if( !isAdminOrMaintainer && !hasPortalCapability || !hasMembership) 
        return <AccessDeniedScreen />
    }

    return  <Outlet context={locale}/>

}

export default ProtectedRoutes