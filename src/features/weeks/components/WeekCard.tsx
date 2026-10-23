import { Link } from "react-router-dom";
import { Week } from "../weeks.schema";
import styles from "../WeeksPage.module.css";
import { Locale, messages } from "@core/i18n";

interface WeekCardProps {
    cohortSlug: string;
    week: Week;
    className?: string;
    copy: (typeof messages)[Locale];
    locale: Locale;
}

const WeekCard = ({ cohortSlug, week, className = "", copy, locale }: WeekCardProps) => {
  const statusClassMapping: Record<Week["status"], string> = {
    active: styles.statusActive,
    completed: styles.statusCompleted,
    upcoming: styles.statusUpcoming,
    draft: styles.statusUpcoming,
  };

  const cardStateClass = week.isCurrent ? styles.cardActive : "";

  return (
    <Link
      to={`/${locale}/portal/cohorts/${cohortSlug}/weeks/${week.weekNumber}`}
      className={`${styles.weekCard} ${cardStateClass} ${className}`.trim()}
    >
      <div className={styles.cardTop}>
        <div className={styles.weekNumber}>{copy.portal.week} {week.weekNumber}</div>
        <span className={`${styles.statusPill} ${statusClassMapping[week.status]}`}>
          {week.status}
        </span>
      </div>

      {week.concept && <span className={styles.conceptTag}>{week.concept}</span>}
      <h3 className={styles.weekTitle}>{week.title}</h3>
      <p className={styles.guidingQuestion}>{week.guidingQuestion}</p>

      {week.assignment && (
        <section className={styles.assignmentSection}>
          <p className={styles.assignmentLabel}>{copy.portal.assignment}</p>
          <h4 className={styles.assignmentTitle}>{week.assignment.title}</h4>
          <div className={styles.labelsList}>
            {week.assignment.labels.map((label) => (
              <span key={label} className={styles.tagPill}>
                {label}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className={styles.cardFooter}>
         <span>→</span> {copy.portal.viewWeek}
      </div>
    </Link>
  );
};

export default WeekCard;