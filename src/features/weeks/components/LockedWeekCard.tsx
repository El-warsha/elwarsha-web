import styles from "../WeeksPage.module.css";

type LockedWeekCardProps = {
    weekNumber: number;
    title: string;
    concept: string;
    status:string
};

export function LockedWeekCard({
    weekNumber,
    title,
    concept,
    status
}: LockedWeekCardProps) {
    return (
        <article
            className={`${styles.weekCard} ${styles.cardLocked}`}
            aria-label={`Week ${weekNumber}, locked`}
        > <div> <div className={styles.cardTop}> <span className={styles.weekNumber}>
            WEEK {String(weekNumber).padStart(2, "0")} </span>

               <span className={styles.statusPill} >{status}</span>
        </div>

                <h2 className={styles.weekTitle}>{title}</h2>

                <p className={styles.guidingQuestion}>{concept}</p>
            </div>

            <div className={styles.lockedFooter}>
                <span aria-hidden="true">🔒</span>
                <span>Complete previous weeks to unlock</span>
            </div>
        </article>

    );
}
