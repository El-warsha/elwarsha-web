
import { Link } from "react-router-dom";

import type { Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

interface WeekCardProps {
  week: Week;
  locale: Locale;
}

export function WeekCard({ week, locale }: WeekCardProps) {
  const isActive = week.isCurrent || week.status === "active";

  const statusText =
    week.status === "completed"
      ? locale === "ar"
        ? "مكتمل"
        : "Completed"
      : isActive
        ? locale === "ar"
          ? "الأسبوع الحالي"
          : "In Progress"
        : locale === "ar"
          ? "متاح"
          : "Available";

  const statusClass =
    week.status === "completed"
      ? styles.statusCompleted
      : isActive
        ? styles.statusActive
        : styles.statusUpcoming;

  return (
    <Link
      to={`/${locale}/portal/cohorts/${week.cohort.slug}/weeks/${week.weekNumber}`}
      className={`${styles.weekCard} ${isActive ? styles.cardActive : ""}`}
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {locale === "ar" ? "الأسبوع" : "Week"}{" "}
            {String(week.weekNumber).padStart(2, "0")}
          </span>

          <span className={`${styles.statusPill} ${statusClass}`}>
            {statusText}
          </span>
        </div>

        {week.concept && (
          <span className={styles.conceptTag}>{week.concept}</span>
        )}

        <h2 className={styles.weekTitle}>{week.title}</h2>

        {week.guidingQuestion && (
          <p className={styles.guidingQuestion}>{week.guidingQuestion}</p>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span>{locale === "ar" ? "عرض الأسبوع ←" : "View Week →"}</span>
      </div>
    </Link>
  );
}
