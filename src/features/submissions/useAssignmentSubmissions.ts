import { useQuery } from "@tanstack/react-query";

import { api, type AssignmentSubmissionsResponse } from "@core/api";
import type { Locale } from "@core/i18n";

export function useAssignmentSubmissions(
  cohortSlug: string,
  weekNumber: string,
  locale: Locale,
  options?: { enabled?: boolean },
) {
  return useQuery<AssignmentSubmissionsResponse>({
    queryKey: ["cohorts", cohortSlug, "weeks", weekNumber, "submissions", { locale }],
    queryFn: async () => await api.getAssignmentSubmissions(cohortSlug, Number(weekNumber)),
    staleTime: 60_000,
    enabled: Boolean(cohortSlug) && Boolean(weekNumber) && (options?.enabled ?? true),
  });
}
