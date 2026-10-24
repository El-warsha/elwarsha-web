import { Link } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

export interface WeekCardProps {
  week: Week;
  locale: Locale;
}

export function WeekCard({ week, locale }: WeekCardProps) {
  const copy = messages[locale];

  const statusClass =
    week.status === "active"
      ? styles.statusActive
      : week.status === "completed"
        ? styles.statusCompleted
        : styles.statusUpcoming;

  const statusLabel =
    week.status === "active"
      ? copy.portal.inProgress
      : week.status === "completed"
        ? copy.portal.completed
        : copy.portal.upcoming;

  const cardClasses = [styles.weekCard, week.isCurrent ? styles.cardActive : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to={`/${locale}/portal/cohorts/${week.cohort.slug}/weeks/${week.weekNumber}`}
      className={cardClasses}
      data-testid={`week-card-${week.weekNumber}`}
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {copy.portal.week} {week.weekNumber}
          </span>
          <span className={`${styles.statusPill} ${statusClass}`}>{statusLabel}</span>
        </div>

        {week.concept && <span className={styles.conceptTag}>{week.concept}</span>}

        <h2 className={styles.weekTitle}>{week.title}</h2>

        {week.guidingQuestion && (
          <p className={styles.guidingQuestion}>{week.guidingQuestion}</p>
        )}
      </div>

      {week.assignment && (
        <div className={styles.assignmentSection}>
          <div className={styles.assignmentLabel}>{copy.portal.assignment}</div>
          <div className={styles.assignmentTitle}>{week.assignment.title}</div>
          {week.assignment.labels.length > 0 && (
            <div className={styles.labelsList}>
              {week.assignment.labels.map((label) => (
                <span key={label} className={styles.tagPill}>
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.cardFooter}>
        <span>{copy.portal.viewWeek}</span>
        <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
      </div>
    </Link>
  );
}
