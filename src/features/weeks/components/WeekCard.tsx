import { Link } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";

import type { Week } from "../weeks.schema.js";
import styles from "./WeekCard.module.css";

export interface WeekCardProps {
  week: Week;
  locale: Locale;
}

export function WeekCard({ week, locale }: WeekCardProps) {
  const copy = messages[locale].portal;
  const isActive = week.status === "active";
  const statusLabel = isActive ? copy.inProgress : copy.completed;

  return (
    <article className={`${styles.card} ${isActive ? styles.active : styles.completed}`}>
      <div className={styles.header}>
        <span className={styles.weekNumber}>
          {copy.week} {week.weekNumber}
        </span>
        <span
          className={`${styles.badge} ${isActive ? styles.badgeActive : styles.badgeCompleted}`}
        >
          {statusLabel}
        </span>
      </div>

      <h3 className={styles.title}>{week.title}</h3>
      {week.tagline && <p className={styles.tagline}>{week.tagline}</p>}
      {week.concept && <p className={styles.concept}>{week.concept}</p>}

      <Link
        to={`/${locale}/weeks/${week.cohort.slug}/${week.weekNumber}`}
        className={styles.link}
      >
        {copy.viewWeek} →
      </Link>
    </article>
  );
}
