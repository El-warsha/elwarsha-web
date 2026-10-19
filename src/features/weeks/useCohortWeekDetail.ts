import { useQuery } from "@tanstack/react-query";

import { api } from "@core/api";
import type { Locale } from "@core/i18n";
import { weekSchema, type Week } from "./weeks.schema.js";

export function useCohortWeekDetail(
  cohortSlug: string,
  weekNumber: number,
  locale: Locale,
  options?: { enabled?: boolean },
) {
  return useQuery<Week>({
    queryKey: ["cohorts", cohortSlug, "weeks", weekNumber, { locale }],
    queryFn: async () => {
      const data = await api.getCohortWeek(cohortSlug, weekNumber, { locale });
      return weekSchema.parse(data);
    },
    enabled:
      Boolean(cohortSlug) &&
      Number.isInteger(weekNumber) &&
      weekNumber >= 1 &&
      weekNumber <= 8 &&
      (options?.enabled ?? true),
  });
}
