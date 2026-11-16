import { messages, type Locale } from "@core/i18n";
import type { SubmissionStatus } from "@core/api";

import { useAssignmentSubmissions } from "../useSubmission.js";

type Props = { locale: Locale; cohortSlug: string; weekNumber: number };

type View = "draft" | "in_review" | "merged";

function toView(status: SubmissionStatus): View {
  if (status === "merged") return "merged";
  if (status === "draft" || status === "withdrawn") return "draft";
  return "in_review";
}

export function SubmissionStatusCard({ locale, cohortSlug, weekNumber }: Props) {
  const copy = messages[locale].portal;
  const { data, isPending, isError, refetch, isFetching } = useAssignmentSubmissions(
    cohortSlug,
    weekNumber,
  );
  const tag = `[week-${String(weekNumber).padStart(2, "0")}]`;

  const text = {
    draft: { title: copy.submissionDraftTitle, body: copy.submissionDraftBody.replace("{tag}", tag) },
    in_review: { title: copy.submissionInReviewTitle, body: copy.submissionInReviewBody },
    merged: { title: copy.submissionMergedTitle, body: copy.submissionMergedBody },
  } as const;

  return (
    <section aria-label={copy.submissionStatus} aria-live="polite">
      <header>
        <h2>{copy.submissionStatus}</h2>
        <button type="button" onClick={() => void refetch()} disabled={isFetching}>
          {copy.refreshFromGithub}
        </button>
      </header>

      {isPending ? <p role="status">{copy.loading}</p> : null}
      {isError ? <p role="alert">{copy.submissionsError}</p> : null}

      {data?.submissions.map((item) => {
        const repo = `${item.githubOwner}/${item.githubRepo}`;
        const view = text[toView(item.status)];
        return (
          <article key={repo}>
            <h3>
              <a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer noopener">
                {repo}
              </a>
            </h3>
            <p>{view.title}</p>
            <p>{view.body}</p>
            {item.pullRequest && item.prUrl ? (
              <a href={item.prUrl} target="_blank" rel="noreferrer noopener">
                {copy.viewPrOnGithub} #{item.pullRequest.number}
              </a>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}