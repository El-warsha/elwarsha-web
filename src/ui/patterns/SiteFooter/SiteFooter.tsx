import { messages, type Locale } from "@core/i18n";

import styles from "./SiteFooter.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className={styles.footer}>
      <strong>{messages[locale].brand}</strong>
      <p>{messages[locale].footer}</p>
    </footer>
  );
}
