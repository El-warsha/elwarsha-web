import type { messages, Locale } from "@core/i18n";
import type { Week } from "../../weeks.schema";
import styles from "./WeekCard.module.css";
import { Badge } from "@ui/components/Badge/Badge";

export interface LockedWeekCardProps {
  copy: (typeof messages)[Locale];
  week: Week;
}

export function LockedWeekCard({
  copy,
  week,
}: LockedWeekCardProps) {
  return (
    <div
      className={`${styles.weekCard} ${styles.cardLocked}`}
      aria-disabled="true"
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {copy.portal.week} {week.weekNumber}
          </span>

          <Badge>{copy.portal.upcoming}</Badge>
        </div>

        <h2 className={styles.weekTitle}>{week.title}</h2>

        <p className={styles.conceptTag}>{week.concept}</p>

        {week.guidingQuestion && (
          <p className={styles.guidingQuestion}>
            {week.guidingQuestion}
          </p>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span>{copy.portal.viewWeek}</span>
        <span aria-hidden="true">🔒</span>
      </div>
    </div>
  );
}