import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@core/i18n";
import { weekSchema, type Week } from "./weeks.schema";
import { api } from "@core/api"; // تأكد أن مسار الـ api صحيح حسب مشروعك

/**
 * Hook to fetch weeks list for a cohort.
 */
export function useCohortWeeks(
  cohortSlug: string,
  locale: Locale,
  options?: { enabled?: boolean },
) {
  return useQuery<Week[]>({
    queryKey: ["cohorts", cohortSlug, "weeks", { locale }],
    queryFn: async () => {
      // 1. استدعاء الـ API كما هو مطلوب في الـ TODO
      const data = await api.listCohortWeeks(cohortSlug, { locale });
      
      // 2. التحقق من صحة البيانات باستخدام Zod (array parse)
      return weekSchema.array().parse(data);
    },
    enabled: options?.enabled ?? true, // تفعيل الـ query بشكل طبيعي
  });
}
