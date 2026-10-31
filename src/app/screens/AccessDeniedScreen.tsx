import { Locale, messages } from "@core/i18n";
import { ButtonLink } from "@ui/components/Button/Button";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

const AccessDeniedScreen = () => {
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
        <PageSection eyebrow={copy.portal.title} title={copy.portal.authorizedFailedTitle}>
            <StatePanel 
            title={copy.portal.authorizedFailedTitle} 
            body={copy.portal.authorizedFailedBody} 
            />
            <div>
                <ButtonLink href={`/${locale}/`}>
                  {copy.portal.authorizedFailedButton}
                </ButtonLink>
            </div>
        </PageSection>
    </div>
  )
}

export default AccessDeniedScreen