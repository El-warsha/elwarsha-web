import { messages, type Locale } from "@core/i18n";
import { CohortApplicationForm } from "./CohortApplicationForm.js";

import styles from "./ApplyPage.module.css";

export function ApplyPage({ locale }: { locale: Locale }) {
  const copy = messages[locale].apply;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>

        <div className={styles.metaPills}>
          <span className={styles.pill}>
            <span>🗓</span>
            <span>{copy.weeks}</span>
          </span>
          <span className={styles.pill}>
            <span>⚡</span>
            <span>{copy.prs}</span>
          </span>
          <span className={styles.pill}>
            <span>👥</span>
            <span>{copy.reviews}</span>
          </span>
          <span className={styles.pill}>
            <span>🛠</span>
            <span>{copy.product}</span>
          </span>
        </div>

        <div className={styles.callout}>
          <strong>{copy.notePrefix}</strong>
          {copy.note}
        </div>
      </header>

      <CohortApplicationForm locale={locale} cohortSlug="cohort-2" />
    </main>
  );
}
