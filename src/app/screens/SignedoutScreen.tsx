import { api } from "@core/api";
import { Locale, messages } from "@core/i18n";
import { ButtonLink } from "@ui/components/Button/Button";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

const SignedoutScreen = () => {
    const locale = useOutletContext<Locale>();
    const copy = messages[locale];

    const alertRef = useRef<HTMLDivElement>(null)
    
    useEffect(()=> {
      if(alertRef.current) {
        alertRef.current.focus()
      }
    }, [])
      
    return (
     <div role="alert" ref={alertRef} tabIndex={-1}>
        <PageSection eyebrow={copy.portal.title} title={copy.portal.signInTitle}>
            <StatePanel 
            title={copy.portal.authFailedTitle} 
            body={copy.portal.authFailedBody} 
            />
            <div>
            <ButtonLink href={api.loginUrl({ locale })}>
                {copy.portal.logIn}
            </ButtonLink>
            </div>
        </PageSection>
    </div>
  )
}

export default SignedoutScreen