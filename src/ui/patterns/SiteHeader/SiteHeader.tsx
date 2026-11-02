import { NavLink } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";

import { useSession } from "@core/session";

import styles from "./SiteHeader.module.css";

export function SiteHeader({
  locale,
  onToggleLocale,
}: {
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const copy = messages[locale];
  const prefix = `/${locale}`;
  const { user, status, mutateSession } = useSession();

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      await mutateSession();
      window.location.href = `${prefix}/`;
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className={styles.header}>
      <NavLink className={styles.brand} to={`${prefix}/`}>
        <span className={styles.mark} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {copy.brand}
      </NavLink>
      <nav className={styles.nav} aria-label={copy.brand}>
        <NavLink to={`${prefix}/initiative/`}>{copy.nav.initiative}</NavLink>
        <NavLink to={`${prefix}/roadmap/`}>{copy.nav.roadmap}</NavLink>
        <NavLink to={`${prefix}/participation/`}>{copy.nav.participation}</NavLink>
        <NavLink to={`${prefix}/faq/`}>{copy.nav.faq}</NavLink>
        <NavLink to={`${prefix}/portal/`}>{copy.nav.portal}</NavLink>
      </nav>
      <div className={styles.actions}>
        <button className={styles.lang} type="button" onClick={onToggleLocale}>
          <Badge>{copy.language}</Badge>
        </button>

        {status === "authenticated" && user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{user.name}</span>
            <button onClick={handleLogout} className={styles.applyBtn} type="button">
              {locale === "ar" ? "خروج" : "Sign out"}
            </button>
          </div>
        ) : (
          <a href={`/api/v1/auth/login?locale=${locale}`} className={styles.applyBtn}>
            {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
          </a>
        )}

        <NavLink className={styles.applyBtn} to={`${prefix}/apply/`}>
          {copy.nav.apply}
        </NavLink>
      </div>
    </header>
  );
}
