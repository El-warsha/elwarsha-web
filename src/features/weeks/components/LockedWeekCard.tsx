import { messages, type Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

export interface LockedWeekCardProps {
  week: Week;
  locale: Locale;
}

export function LockedWeekCard({ week, locale }: LockedWeekCardProps) {
  const copy = messages[locale];

  return (
    <div
      className={`${styles.weekCard} ${styles.cardLocked}`}
      aria-disabled="true"
      data-testid={`locked-week-card-${week.weekNumber}`}
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {copy.portal.week} {week.weekNumber}
          </span>
          <span className={`${styles.statusPill} ${styles.statusUpcoming}`}>
            {copy.portal.locked}
          </span>
        </div>

        <h2 className={styles.weekTitle}>{week.title}</h2>

        {week.tagline && <p className={styles.guidingQuestion}>{week.tagline}</p>}
      </div>

      <div className={styles.lockedFooter}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{copy.portal.lockedNotice}</span>
      </div>
    </div>
  );
}
