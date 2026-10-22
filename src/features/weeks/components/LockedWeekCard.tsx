import type { messages, Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeekDetailPage.module.css";

export interface LockedWeekCardProps {
  week: Week;
  locale: Locale;
  copy: (typeof messages)[Locale];
}

export function LockedWeekCard({ week, locale, copy }: LockedWeekCardProps) {
  return (
    <div
      className={styles.assignmentCard}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        marginBottom: 0,
        opacity: 0.85,
      }}
    >
      <div>
         <div
          className={styles.assignmentTop}
          style={{ minHeight: "5.5rem", alignItems: "flex-start" }}
        >
          <h3 className={styles.assignmentTitle}>
            Week {week.weekNumber}: {week.title}
          </h3>
          <span className={styles.pill}>🔒 upcoming</span>
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

      <div style={{ marginTop: "1rem" }}>
        <span className={styles.tagline} style={{ fontSize: "0.9rem" }}>
          Locked until week begins
        </span>
      </div>
    </div>
  );
}