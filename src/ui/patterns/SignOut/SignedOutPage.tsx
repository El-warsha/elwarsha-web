
import { useParams } from "react-router-dom";

import { api } from "@core/api";
import { messages, type Locale } from "@core/i18n";

import styles from "./AccessPages.module.css";

export function SignedOutPage() {
  const { locale: routeLocale } = useParams();
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const copy = messages[locale].portal;

  return (
    <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"}>
      <section className={styles.card} aria-labelledby="signed-out-title">
        <h1 id="signed-out-title">{copy.signInTitle}</h1>

        <a
          className={styles.primaryAction}
          href={api.loginUrl({ locale })}
        >
          {copy.logIn}
        </a>
      </section>
    </main>
  );
}
