import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { api } from "@core/api";
import { useSession } from "@core/session";
import { Button, ButtonLink } from "@ui/components/Button/Button";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";

import styles from "./DashboardPage.module.css";
import { TasksPage } from "@features/tasks/TasksPage";

export function DashboardPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionState = useSession();

  if (sessionState.status === "loading") {
    return (
      <PageSection eyebrow={copy.portal.title} title={copy.portal.loading}>
        <StatePanel title={copy.portal.loading} body="" />
      </PageSection>
    );
  }

  if (sessionState.status === "authenticated") {
    const user = sessionState.session.user;
    return (
      <PageSection eyebrow={copy.portal.title} title={copy.portal.dashboard}>
        <p>{user.displayName}</p>
        <div className={styles.actions}>
          <Link className={styles.link} to={`/${locale}/portal/assignments`}>
            {copy.portal.assignments}
          </Link>
          <Button
            variant="ghost"
            onClick={async () => {
              await sessionState.logout();
              navigate(`/${locale}/`);
            }}
          >
            {copy.portal.signOut}
          </Button>
        </div>
      </PageSection>
    );
  }

  const authFailed = searchParams.get("auth") === "failed";

  return (
    <PageSection eyebrow={copy.portal.title} title={copy.portal.signInTitle}>
      {authFailed && (
        <div className={styles.authFailed}>
          <StatePanel
            title={copy.portal.authFailedTitle}
            body={copy.portal.authFailedBody}
          />
        </div>
      )}
      <div className={styles.actions}>
        <ButtonLink href={api.loginUrl({ locale })}>{copy.portal.logIn}</ButtonLink>
      </div>
      <TasksPage locale={locale}/>
    </PageSection>
  );
}
