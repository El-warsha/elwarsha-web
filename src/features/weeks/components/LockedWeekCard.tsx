
import type { Locale } from "@core/i18n";
import type { Week } from "../weeks.schema.js";
import styles from "../WeeksPage.module.css";

interface LockedWeekCardProps {
  week: Week;
  locale: Locale;
}

export function LockedWeekCard({ week, locale }: LockedWeekCardProps) {
  return (
    <article
      className={`${styles.weekCard} ${styles.cardLocked}`}
      aria-label={
        locale === "ar"
          ? `الأسبوع ${week.weekNumber} مقفول`
          : `Week ${week.weekNumber} is locked`
      }
    >
      <div>
        <div className={styles.cardTop}>
          <span className={styles.weekNumber}>
            {locale === "ar" ? "الأسبوع" : "Week"}{" "}
            {String(week.weekNumber).padStart(2, "0")}
          </span>

          <span className={styles.statusPill}>
            {locale === "ar" ? "مقفل" : "Locked"}
          </span>
        </div>

        <h2 className={styles.weekTitle}>{week.title}</h2>

        {week.concept && (
          <span className={styles.conceptTag}>{week.concept}</span>
        )}
      </div>

      <div className={styles.lockedFooter}>
        <span aria-hidden="true"></span>
        <span>
          {locale === "ar"
            ? "هذا الأسبوع غير متاح حاليًا"
            : "This week is not available yet"}
        </span>
      </div>
    </article>
  );
}
