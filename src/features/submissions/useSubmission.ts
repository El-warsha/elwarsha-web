import { useQuery } from '@tanstack/react-query';

export interface RepositorySubmission {
  repositoryName: string;
  status: 'draft' | 'in_review' | 'merged';
  prUrl: string | null;
  prNumber: number | null;
}

export function useAssignmentSubmissions(cohortSlug: string, weekNumber: number) {
  return useQuery({
    queryKey: ['assignment-submissions', cohortSlug, weekNumber],
    queryFn: async () => {
      const response = await fetch(`/api/v1/cohorts/${cohortSlug}/assignments/${weekNumber}/submissions`);
      if (!response.ok) {
        throw new Error('Failed to fetch submission statuses');
      }
      const data = await response.json();
      return data as {
        assignmentId: string;
        weekNumber: number;
        submissions: RepositorySubmission[];
      };
    },
    staleTime: 60_000,
  });
}