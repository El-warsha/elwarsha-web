import type { messages, Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeekDetailPage.module.css";
import { Link } from "react-router-dom";

export interface WeekCardProps {
  week: Week;
  locale: Locale;
  copy: (typeof messages)[Locale];
  isActive?: boolean;
}

export function WeekCard({ week, locale, copy, isActive }: WeekCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const isCompleted = today > week.endDate;

  return (
    <div 
      className={styles.assignmentCard}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        marginBottom: 0,
        borderColor: isActive ? "var(--color-text-success)" : undefined,
      }}
    >
      <div>
         <div className={styles.assignmentTop} style={{ minHeight: "5.5rem", alignItems: "flex-start" }}>
          <h3 className={styles.assignmentTitle}>
            Week {week.weekNumber}: {week.title}
          </h3>
          
           {isActive ? (
            <span className={`${styles.pill} ${styles.pillActive}`}>
              <span>🟢</span>
              <span>Active</span>
            </span>
          ) : isCompleted ? (
            <span className={`${styles.pill} ${styles.pillCompleted}`}>
              <span>✓</span>
              <span>Completed</span>
            </span>
          ) : (
            <span className={styles.pill}>Unlocked</span>
          )}
        </div>

         <div style={{ minHeight: "2.5rem" }}>
          {week.concept && <p className={styles.tagline}>{week.concept}</p>}
        </div>

         <div className={styles.metaRow}>
          <span className={styles.pill}>
            <span>🗓</span>
            <span>
              {week.startDate} — {week.endDate}
            </span>
          </span>
        </div>
      </div>

      {!week.isLocked && (
        <div style={{ marginTop: "1rem" }}>
          <Link
            to={`/${locale}/portal/cohorts/${week.cohort.slug}/weeks/${week.weekNumber}`}
            className={styles.resourceLink}
          >
            View week details →
          </Link>
        </div>
      )}
    </div>  
  );
}