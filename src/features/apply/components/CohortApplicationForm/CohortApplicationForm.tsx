import {  type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";

import ApplicationForm from "../ApplicationForm/ApplicationForm";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  // const copy = messages[locale].apply;

  return (
    <section className={styles.form}>
      {/* TODO (Week 2): Implement the 4 fieldsets, inputs, and validation contract */}
      <div className={styles.placeholder}>
        <p>
          {isAr
            ? "استمارة التقديم — قيد الإنشاء (مهمة الأسبوع الثاني)"
            : "Application form under construction (Week 2 Task)"}
        </p>
     <ApplicationForm locale={locale} />
      </div>
  
    </section>
  );
}
