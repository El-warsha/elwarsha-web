
import { Locale, messages } from "@core/i18n/locales";
import styles from "../WeeksPage.module.css";

interface CohortHeaderBarProps {
    cohortName: string;
    cohortStartDate: string;
    cohortEndDate: string;
    cohortCurrentWeek: number;
    copy?: (typeof messages)[Locale];
}

const CohortHeaderBar = ({ cohortName, cohortStartDate, cohortEndDate, cohortCurrentWeek, copy }: CohortHeaderBarProps) => {
  return (
    <div className={styles.cohortBar}>
      <div className={styles.cohortInfo}>
        <h2 className={styles.cohortName}>{cohortName}</h2>
        <p className={styles.cohortDates}>{cohortStartDate} - {cohortEndDate}</p>
      </div>
      <p className={styles.cohortDates}>
          {copy?.portal.currentWeek || "Current Week"}: {cohortCurrentWeek}
      </p>
    </div>
  )
}

export default CohortHeaderBar