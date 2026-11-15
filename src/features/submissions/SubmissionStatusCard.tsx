import React from 'react';
import { useAssignmentSubmissions } from './useSubmission';

interface SubmissionStatusCardProps {
  cohortSlug: string;
  weekNumber: number;
}

export const SubmissionStatusCard: React.FC<SubmissionStatusCardProps> = ({ cohortSlug, weekNumber }) => {
  const { data, isLoading, isError, refetch, isFetching } = useAssignmentSubmissions(cohortSlug, weekNumber);

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 animate-pulse mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 rounded-xl bg-red-50 text-red-600 border border-red-200 mb-6">
        <p className="font-semibold">Failed to load submission statuses.</p>
        <button onClick={() => refetch()} className="mt-2 text-sm underline font-medium">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" role="region" aria-live="polite">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Runtime GitHub Submission Tracker</h3>
          <p className="text-sm text-gray-500">Live multi-repo PR status synchronization for Week {weekNumber}</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {isFetching ? 'Syncing...' : '🔄 Refresh from GitHub'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.submissions.map((sub) => {
          let badgeColor = 'bg-gray-100 text-gray-700 border-gray-300';
          let statusText = 'Draft';

          if (sub.status === 'in_review') {
            badgeColor = 'bg-yellow-50 text-yellow-800 border-yellow-200';
            statusText = 'In Review';
          } else if (sub.status === 'merged') {
            badgeColor = 'bg-green-50 text-green-800 border-green-200';
            statusText = 'Merged';
          }

          return (
            <div key={sub.repositoryName} className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{sub.repositoryName}</span>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${badgeColor}`}>
                  {statusText}
                </span>
              </div>

              <div className="text-sm text-gray-600 mt-2">
                {sub.status === 'draft' && (
                  <p>
                    Open a PR on GitHub titled <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">[week-{weekNumber}] &lt;description&gt;</code>
                  </p>
                )}
                {sub.status !== 'draft' && sub.prUrl && (
                  <a
                    href={sub.prUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    View PR #{sub.prNumber} ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};