import { messages, type Locale } from "@core/i18n";

import type { Week } from "../weeks.schema.js";
import styles from "./LockedWeekCard.module.css";

export interface LockedWeekCardProps {
  week: Week;
  locale: Locale;
}

export function LockedWeekCard({ week, locale }: LockedWeekCardProps) {
  const copy = messages[locale].portal;

  return (
    <article
      className={styles.card}
      aria-label={`${copy.locked}: ${copy.week} ${week.weekNumber}`}
    >
      <div className={styles.header}>
        <span className={styles.weekNumber}>
          {copy.week} {week.weekNumber}
        </span>
        <span className={styles.padlock} aria-hidden="true">
          🔒
        </span>
      </div>

      <h3 className={styles.title}>{week.title}</h3>

      <p className={styles.notice}>{copy.lockedNotice}</p>

      <span className={styles.disabledLink} aria-disabled="true">
        {copy.locked}
      </span>
    </article>
  );
}
