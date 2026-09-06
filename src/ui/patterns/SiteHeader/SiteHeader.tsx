import { NavLink } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";

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
      <button className={styles.lang} type="button" onClick={onToggleLocale}>
        <Badge>{copy.language}</Badge>
      </button>
    </header>
  );
}
