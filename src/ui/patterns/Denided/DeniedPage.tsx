
import { useParams } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";

import styles from "./AccessPages.module.css";

export function DeniedPage() {
  const { locale: routeLocale } = useParams();
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const copy = messages[locale].portal;

  return (
    <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"}>
      <section className={styles.card} aria-labelledby="denied-title">
        <span className={styles.status}>403</span>

        <h1 id="denied-title">{copy.accessDeniedTitle}</h1>

        <p>{copy.accessDeniedBody}</p>
      </section>
    </main>
  );
}
