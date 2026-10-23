import { messages, type Locale } from "@core/i18n";
import styles from "./WeekCard.module.css";
import { useLocation } from "react-router-dom";

type WeekCardProps = {
  locale: Locale;
  weekNumber: number;
  title: string;
  concept: string;
  status: string;
};

export function WeekCard({
  locale,
  weekNumber,
  title,
  concept,
  status,
}: WeekCardProps) {
  const t = messages[locale].portal.weeksPage.weekCard;
const location = useLocation();
const weekHref = `${location.pathname}/${weekNumber}`;
  return (
    <article
      className={styles.card}
      aria-labelledby={`week-${weekNumber}-title`}
    >
      <div className={styles.topRow}>
        <span className={status=='completed'?styles.statusCompleted:styles.statusActive}>{status}</span>

        <span className={styles.weekNumber}>
          {t.week} {weekNumber}
        </span>
      </div>

      <div className={styles.content}>
        <h2
          id={`week-${weekNumber}-title`}
          className={styles.title}
        >
          {title}
        </h2>

        <p className={styles.concept}>{concept}</p>
      </div>

       <a className={styles.link} href={weekHref}>
        {t.details}
        <span aria-hidden="true">→</span>
      </a> 
    </article>
  );
}