import type { messages, Locale } from "@core/i18n";
import type { Week } from "../../weeks.schema";
import styles from "./WeekCard.module.css";
import { Link } from "react-router-dom";

export interface WeekCardProps {
  copy: (typeof messages)[Locale];
  week: Week;
}

export function WeekCard({ copy, week }: WeekCardProps) {
  const statusLabel =
    week.status === "completed"
      ? copy.portal.completed
      : week.status === "active"
        ? copy.portal.inProgress
        : copy.portal.upcoming;

  const statusClass =
    week.status === "completed"
      ? styles.statusCompleted
      : week.status === "active"
        ? styles.statusActive
        : styles.statusUpcoming;

  return (
    <Link
      to={`/${copy}/portal/cohorts/${week.cohort.slug}/weeks/${week.weekNumber}`}
      className={`${styles.weekCard} ${
        week.isCurrent ? styles.cardActive : ""
      }`}
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {copy.portal.week} {week.weekNumber}
          </span>

          <span className={`${styles.statusPill} ${statusClass}`}>
            {statusLabel}
          </span>
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
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}