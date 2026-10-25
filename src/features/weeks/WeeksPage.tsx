import React from "react";
import { useParams } from "react-router-dom";
import type { Locale } from "@core/i18n";
import styles from "./WeeksPage.module.css";
import { useCohortWeeks } from "./useCohortWeeks";
import { CohortHeaderBar } from "./components/CohortHeaderBar";
import { WeekCard } from "./components/WeekCard";
import { LockedWeekCard } from "./components/LockedWeekCard";

export function WeeksPage({ locale }: { locale: Locale }) {
  // جلب الـ cohortSlug من الـ URL أو استخدام قيمة افتراضية مثل "cohort-01"
  const params = useParams();
  const cohortSlug = params.cohortSlug || "cohort-01";

  // استدعاء الـ hook الذي أنشأناه لجلب البيانات
  const { data: weeks, isLoading, error } = useCohortWeeks(cohortSlug, locale);

  if (isLoading) {
    return <div className="p-8 text-center">Loading weeks...</div>;
  }

  if (error || !weeks) {
    return <div className="p-8 text-center text-red-500">Error loading cohort weeks.</div>;
  }

  // نفترض أن الـ cohort info يأتي مع أول أسبوع أو يمكن عرضه من البيانات المتاحة
  // (تأكد من شكل الـ API عندك، أو يمكنك استخراج بيانات الكوهورت بالشكل المناسب)
  const cohortInfo = weeks[0]?.cohort || {
    name: "Cohort 01",
    startsOn: "2026-10-01",
    endsOn: "2026-11-26",
    currentWeekNumber: 3,
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Portal</p>
        <h1>Weeks Summary</h1>
        <p className={styles.lead}>Explore your active and upcoming curriculum weeks.</p>
      </header>

      {/* شريط عنوان الكوهورت */}
      <CohortHeaderBar
        name={cohortInfo.name}
        startsOn={cohortInfo.startsOn}
        endsOn={cohortInfo.endsOn}
        currentWeekNumber={cohortInfo.currentWeekNumber}
      />

      {/* شبكة عرض الأسابيع */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {weeks.map((week) =>
          week.isLocked ? (
            <LockedWeekCard
              key={week.weekNumber}
              weekNumber={week.weekNumber}
              title={week.title}
              concept={week.concept}
            />
          ) : (
            <WeekCard
              key={week.weekNumber}
              weekNumber={week.weekNumber}
              title={week.title}
              concept={week.concept}
              status={week.status}
              cohortSlug={cohortSlug}
            />
          )
        )}
      </section>
    </div>
  );
}
