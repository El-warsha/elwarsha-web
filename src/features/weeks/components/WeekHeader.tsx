import { useMemo } from "react";
import { marked } from "marked";
import type { messages, Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";
import type { Week } from "../weeks.schema.js";
import styles from "../WeekDetailPage.module.css";

export interface WeekHeaderProps {
  week: Week;
  copy: (typeof messages)[Locale];
}

export function WeekHeader({ week, copy }: WeekHeaderProps) {
  const isActive = week.isCurrent || week.status === "active";
  const statusText =
    week.status === "completed"
      ? copy.portal.completed
      : isActive
        ? copy.portal.inProgress
        : copy.portal.upcoming;

  const statusClass =
    week.status === "completed"
      ? styles.pillCompleted
      : isActive
        ? styles.pillActive
        : styles.pill;

  const bigIdeaHtml = useMemo(() => {
    if (!week.bigIdea) return "";
    return marked.parse(week.bigIdea, { async: false }) as string;
  }, [week.bigIdea]);

  return (
    <>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          {week.cohort.name} • {copy.portal.week}{" "}
          {String(week.weekNumber).padStart(2, "0")}
        </p>
        <h1>{week.title}</h1>
        {week.tagline && <p className={styles.tagline}>{week.tagline}</p>}

        <div className={styles.metaRow}>
          <span className={`${styles.pill} ${statusClass}`}>{statusText}</span>
          <span className={styles.pill}>
            <span>🗓</span>
            <span>
              {week.startDate} — {week.endDate}
            </span>
          </span>
          {week.concept && <Badge>{week.concept}</Badge>}
        </div>
      </header>

      <section className={styles.section}>
        {week.guidingQuestion && (
          <div className={styles.questionCallout}>
            <p>“{week.guidingQuestion}”</p>
          </div>
        )}

        {week.bigIdea && (
          <div className={styles.bigIdeaBox}>
            <strong>{copy.portal.bigIdea}</strong>
            <div
              className={styles.bigIdeaContent}
              dangerouslySetInnerHTML={{ __html: bigIdeaHtml }}
            />
          </div>
        )}
      </section>
    </>
  );
}
