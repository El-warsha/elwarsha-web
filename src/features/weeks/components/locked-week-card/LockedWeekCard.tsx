
import { messages, type Locale } from "@core/i18n";
import styles from "./LockedWeekCard.module.css";

type LockedWeekCardProps = {
  locale: Locale;
  weekNumber: number;
  title: string;
  concept: string;
};

export function LockedWeekCard({
  locale,
  weekNumber,
  title,
  concept,
}: LockedWeekCardProps) {
  const t = messages[locale].portal.weeksPage.lockedWeekCard;

  return (
    <article
      className={styles.card}
      aria-labelledby={`week-${weekNumber}-title`}
    >
      <div className={styles.topRow}>
        <span className={styles.status}>{t.status}</span>

        <span className={styles.weekNumber}>
          {t.week} {weekNumber}
        </span>
      </div>

      <h2
        id={`week-${weekNumber}-title`}
        className={styles.title}
      >
        {title}
      </h2>

      <p className={styles.concept}>{concept}</p>

      <a
        className={styles.disabledLink}
        aria-disabled="true"
      
      >
        {t.details}
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
