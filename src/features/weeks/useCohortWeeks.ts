import { useQuery } from "@tanstack/react-query";

import type { Locale } from "@core/i18n";
import type { Week } from "./weeks.schema.js";

/**
 * Hook to fetch weeks list for a cohort.
 *
 * TODO (Week 3 Task):
 * 1. Call api.listCohortWeeks(cohortSlug, { locale })
 * 2. Validate the response array using Zod (`weekSchema.array().parse(data)`)
 * 3. Use queryKey: ["cohorts", cohortSlug, "weeks", { locale }]
 *
 * Reference: see `useCohortWeekDetail.ts` for a working implementation pattern.
 */
export function useCohortWeeks(
  _cohortSlug: string,
  _locale: Locale,
  _options?: { enabled?: boolean },
) {
  return useQuery<Week[]>({
    queryKey: ["cohorts", _cohortSlug, "weeks", { locale: _locale }],
    queryFn: async () => {
      // TODO (Week 3 Task): Fetch from api.listCohortWeeks and validate with Zod
      return [];
    },
    enabled: false,
  });
}
