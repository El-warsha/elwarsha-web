import { Link } from "react-router-dom";
import type { messages, Locale } from "@core/i18n";
import { StatePanel } from "@ui/patterns/StatePanel/StatePanel";
import type { Week } from "../weeks.schema.js";
import { WeekPagination } from "./WeekPagination.js";
import styles from "../WeekDetailPage.module.css";

export interface WeekLockedViewProps {
  week: Week;
  cohortSlug: string;
  weekNum: number;
  locale: Locale;
  copy: (typeof messages)[Locale];
}

export function WeekLockedView({
  week,
  cohortSlug,
  weekNum,
  locale,
  copy,
}: WeekLockedViewProps) {
  return (
    <main className={styles.page}>
      <Link
        to={`/${locale}/portal/cohorts/${cohortSlug}/weeks`}
        className={styles.backLink}
      >
        <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
        <span>{copy.portal.backToWeeks}</span>
      </Link>

      <header className={styles.header}>
        <p className={styles.eyebrow}>
          {week.cohort.name} • {copy.portal.week}{" "}
          {String(week.weekNumber).padStart(2, "0")}
        </p>
        <h1>{week.title}</h1>
        {week.tagline && <p className={styles.tagline}>{week.tagline}</p>}

        <div className={styles.metaRow}>
          <span className={styles.pill}>🔒 {copy.portal.upcoming}</span>
          <span className={styles.pill}>
            <span>🗓</span>
            <span>
              {week.startDate} — {week.endDate}
            </span>
          </span>
        </div>
      </header>

      <section className={styles.section}>
        <StatePanel
          title={`🔒 ${copy.portal.weekLockedTitle}`}
          body={copy.portal.weekLockedBody.replace("{date}", week.startDate)}
        />
      </section>

      <WeekPagination
        cohortSlug={cohortSlug}
        weekNum={weekNum}
        locale={locale}
        copy={copy}
      />
    </main>
  );
}
