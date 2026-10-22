import { Link } from 'react-router-dom';
import styles from '../WeeksPage.module.css'
import { Locale } from '@core/i18n';

type WeekCardProps = {
    weekNumber: number;
    status: string;
    isCurrent: boolean;
    title: string;
    concept: string;
    cohortSlug :string ;
    locale:Locale

}


export function WeekCard(
    { weekNumber, status, isCurrent, title, concept , cohortSlug , locale }: WeekCardProps
) {
    const statusClass = status === "active" ? styles.statusActive : status === "completed" ? styles.statusCompleted:'';

    return (
        <article className={`${status === 'active' ? styles.cardActive :''} ${styles.weekCard}`}>
            <div className={styles.cardTop}>
                <span className={styles.weekNumber}>Week {String(weekNumber).padStart(2, '0')}</span>
                <span className={`${styles.statusPill} ${statusClass}`}>{status}</span>
            </div>
            {isCurrent ? <p className={styles.conceptTag}>Current Week</p> : ''}
            <div>
                <h3 className={styles.weekTitle}>{title}</h3>
                <p className={styles.guidingQuestion}>{concept}</p>
            </div>
            <div className={styles.cardFooter}>
                <Link to={`/${locale}/portal/cohorts/${cohortSlug}/weeks/${weekNumber}`}>View Details <span aria-hidden="true">→</span></Link>
            </div>
        </article>
    )

}