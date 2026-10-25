import { Link } from "react-router-dom";
import type { messages, Locale } from "@core/i18n";
import styles from "../WeekDetailPage.module.css";

export interface WeekPaginationProps {
  cohortSlug: string;
  weekNum: number;
  locale: Locale;
  copy: (typeof messages)[Locale];
}

export function WeekPagination({
  cohortSlug,
  weekNum,
  locale,
  copy,
}: WeekPaginationProps) {
  const prevWeekNum = weekNum > 1 ? weekNum - 1 : null;
  const nextWeekNum = weekNum < 8 ? weekNum + 1 : null;

  return (
    <nav className={styles.pagination} aria-label={copy.portal.weeks}>
      {prevWeekNum ? (
        <Link
          to={`/${locale}/portal/cohorts/${cohortSlug}/weeks/${prevWeekNum}`}
          className={styles.navButton}
        >
          <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
          <span>
            {copy.portal.prevWeek} ({prevWeekNum})
          </span>
        </Link>
      ) : (
        <span className={styles.navButtonDisabled} />
      )}

      {nextWeekNum ? (
        <Link
          to={`/${locale}/portal/cohorts/${cohortSlug}/weeks/${nextWeekNum}`}
          className={styles.navButton}
        >
          <span>
            {copy.portal.nextWeek} ({nextWeekNum})
          </span>
          <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
        </Link>
      ) : (
        <span className={styles.navButtonDisabled} />
      )}
    </nav>
  );
}
