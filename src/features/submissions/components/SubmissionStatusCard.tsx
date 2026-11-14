import { useAssignmentSubmissions } from "../useAssignmentSubmissions";
import styles from "./SubmissionStatusCard.module.css";
import { messages } from "@core/i18n";
import RepositoryRow from "./RepositoryRow";


interface SubmissionStatusCardProps {
  cohortSlug: string;
  weekNumber: string;
  locale: "en" | "ar";
}

export function SubmissionStatusCard({
  cohortSlug,
  weekNumber,
  locale,
}: SubmissionStatusCardProps) {

  const copy= messages[locale].portal;

  const { data, isLoading, isError, isFetching, refetch } =
    useAssignmentSubmissions(cohortSlug, weekNumber, locale);

  const weekTag = `[week-${String(weekNumber).padStart(2, "0")}]`;

  return (
    <section
      className={styles.submissionCard}
      role="region"
      aria-live="polite"
      aria-label={`Week ${weekNumber} submission progress`}
    >
      <header className={styles.submissionCardHeader}>
        <div>
          <p className={styles.submissionCardEyebrow}>{copy.submissionStatus}</p>
          <h2 className={styles.submissionCardTitle}>{copy.progress}</h2>
        </div>
        <button
          type="button"
          className={styles.submissionCardRefresh}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <span
            className={`${styles.submissionCardSpin} ${isFetching ? styles.isSpinning : ""}`}
            aria-hidden="true"
          >
            ↻
          </span>
          {copy.githubRefresh}
        </button>
      </header>

      {isLoading && (
        <p className={styles.submissionCardNote}>{copy.loading}</p>
      )}

      {isError && (
        <p
          className={`${styles.submissionCardNote} ${styles.submissionCardNoteError}`}
          role="alert"
        >
          {copy.submissionErrorTitle}: {copy.submissionErrorBody}
        </p>
      )}

      {data && data.submissions.length === 0 && (
        <p className={styles.submissionCardNote}>
          {copy.noSubmissions}
        </p>
      )}

      {data && data.submissions.length > 0 && (
        <ul className={styles.submissionCardList}>
          {data.submissions.map((item) => (
            <RepositoryRow
              key={`${item.githubOwner}/${item.githubRepo}`}
              item={item}
              weekTag={weekTag}
              locale={locale}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

