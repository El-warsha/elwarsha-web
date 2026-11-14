import { messages } from "@core/i18n";
import type { RepositorySubmissionItem, SubmissionStatus } from "@core/api";
import styles from "./RepositoryRow.module.css";

interface RepositoryRowProps {
  item: RepositorySubmissionItem;
  weekTag: string;
  locale: "en" | "ar";
}

const RepositoryRow = ({
  item,
  weekTag,
  locale,
}: RepositoryRowProps) => {

  const copy= messages[locale].portal;

  type View = "draft" | "in_review" | "merged";

  const STATUS_LABEL: Record<View, string> = {
      draft: copy.submissionsStatusDraft,
      in_review: copy.submissionsStatusInReview,
      merged: copy.submissionsStatusMerged,
  };

  const BADGE_CLASS: Record<View, string> = {
      draft: styles.badgeDraft,
      in_review: styles.badgeInReview,
      merged: styles.badgeMerged,
  };

  function toView(status: SubmissionStatus): View {
      if (status === "merged") return "merged";
      if (status === "draft" || status === "withdrawn") return "draft";
      return "in_review";
  }

  const view = toView(item.status);
  const repoUrl = `https://github.com/${item.githubOwner}/${item.githubRepo}/${item.prUrl}`;
  const prUrl = item.prUrl ?? item.pullRequest?.htmlUrl ?? null;
  const prNumber = item.pullRequest?.number;

  return (
    <li className={styles.submissionCardRepo}>
      <div className={styles.submissionCardRepoHead}>
        <a
          className={styles.submissionCardRepoLink}
          href={repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Open ${item.githubRepo} repository on GitHub`}
        >
          {item.githubOwner}/{item.githubRepo}
        </a>
        <span className={`${styles.submissionCardBadge} ${BADGE_CLASS[view]}`}>
          {STATUS_LABEL[view]}
        </span>
      </div>

      {view === "draft" && (
        <p className={styles.submissionCardBody}>
          {copy.submissionDraftBody.replace("{tag}", weekTag)}
        </p>
      )}

      {view === "in_review" && (
        <p className={styles.submissionCardBody}>
          {copy.reviews}
          {prUrl && prNumber !== undefined ? (
            <a
              className={styles.submissionCardPrLink}
              href={prUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open pull request #${prNumber} on GitHub`}
            >
              #{prNumber}
            </a>
          ) : (
            <span>#{prNumber}</span>
          )}{" "}
          {copy.submissionInReviewTitle}
        </p>
      )}

      {view === "merged" && (
        <p className={styles.submissionCardBody}>
          {copy.submissionMergedBody}
        </p>
      )}
    </li>
  );
}
export default RepositoryRow;