import { useQuery } from "@tanstack/react-query";

import { api } from "@core/api";

export function useAssignmentSubmissions(cohortSlug: string, weekNumber: number) {
  return useQuery({
    queryKey: ["assignment-submissions", cohortSlug, weekNumber],
    queryFn: () => api.getAssignmentSubmissions(cohortSlug, weekNumber),
    staleTime: 60_000,
  });
}