import { Locale, messages,  } from "@core/i18n";
import { Week } from "../weeks.schema";
import styles from "../WeeksPage.module.css";

interface LockedWeekCardProps {
  week: Week;
  className?: string;
  copy: (typeof messages)[Locale]; 
}

const LockedWeekCard = ({ week, className = "", copy }: LockedWeekCardProps) => {
  return (
    <div className={`${styles.weekCard} ${styles.cardLocked} ${className}`.trim()}>
      <div className={styles.cardTop}>
        <div className={styles.weekNumber}>{copy.portal.week} {week.weekNumber}</div>
        <span className={`${styles.statusPill} ${styles.statusUpcoming}`}>
          {week.status}
        </span>
      </div>

      <h3 className={styles.weekTitle}>{week.title}</h3>
      <p>{copy.portal.weekLockedBody.replace("{date}", week.startDate)}</p>

      <div className={styles.lockedFooter}>
        <span>🔒</span> {copy.portal.weekLockedTitle}
      </div>
    </div>
  );
};

export default LockedWeekCard;