import { useQuery } from "@tanstack/react-query";

import type { Locale } from "@core/i18n";
import { weekSchema, type Week } from "./weeks.schema.js";
import { api } from "@core/api/index.js";

export function useCohortWeeks(
  cohortSlug: string,
  locale: Locale,
  options?: { enabled?: boolean },
) {
  return useQuery<Week[]>({
    queryKey: ["cohorts", cohortSlug, "weeks", { locale }],
    queryFn: async () => {
      const data = await api.listCohortWeeks(cohortSlug, { locale });
      const validatedData = weekSchema.array().parse(data);
      return validatedData;
    },
    enabled: 
      Boolean(cohortSlug) &&
      (options?.enabled ?? true),
  });
}
