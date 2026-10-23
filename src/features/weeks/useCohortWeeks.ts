import { useQuery } from "@tanstack/react-query";

import { api } from "@core/api";
import type { Locale } from "@core/i18n";

import { weekSchema, type Week } from "./weeks.schema.js";

/**
 * Fetches the weeks for a cohort and validates the response with Zod.
 * If the backend contract drifts, parsing fails loudly instead of
 * letting broken data reach the UI.
 */
export function useCohortWeeks(
  cohortSlug: string,
  locale: Locale,
  options?: { enabled?: boolean },
) {
  return useQuery<Week[]>({
    queryKey: ["cohorts", cohortSlug, "weeks", { locale }],
    queryFn: async () => {
      const raw = await api.listCohortWeeks(cohortSlug, { locale });
      return weekSchema.array().parse(raw);
    },
    enabled: options?.enabled ?? true,
    staleTime: 30_000,
  });
}
