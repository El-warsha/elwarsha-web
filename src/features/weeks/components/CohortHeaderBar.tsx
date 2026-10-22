import styles from "./CohortHeaderBar.module.css";

type CohortHeaderBarProps = {
    cohortName: string;
    startDate: string;
    endDate: string;
    currentWeek: number;
};

export function CohortHeaderBar({
    cohortName,
    startDate,
    endDate,
    currentWeek,
}: CohortHeaderBarProps) {
    return (
    <header className={styles.cohortHeader}> <div className={styles.cohortHeaderInfo}>
        <p className={styles.cohortHeaderEyebrow}>COHORT OVERVIEW</p>

        <h1 className={styles.cohortHeaderTitle}>{cohortName}</h1>

        <p className={styles.cohortHeaderDates}>
            <span>{startDate}</span>
            <span className={styles.cohortHeaderDateSeparator} aria-hidden="true">
                →
            </span>
            <span>{endDate}</span>
        </p>
    </div>

        <div className={styles.cohortHeaderweek}>
            <span className={styles.cohortHeaderWeeklabel}>CURRENT WEEK</span>

            <span className={styles.cohortHeaderWeekbadge}>
                 WEEK {String(currentWeek).padStart(2, "0")}
            </span>
        </div>
    </header>


    );
}
