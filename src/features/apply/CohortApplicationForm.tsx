import type { CohortApplicationResponse } from "@core/api";
import type { Locale } from "@core/i18n";
import { useCohortApplicationForm } from "./useCohortApplicationForm.js";
import { CohortApplicationReceipt } from "./components/CohortApplicationReceipt.js";
import { PersonalInfoSection } from "./components/PersonalInfoSection.js";
import { TechnicalBackgroundSection } from "./components/TechnicalBackgroundSection.js";
import { PersonalPageSection } from "./components/PersonalPageSection.js";
import { MotivationSection } from "./components/MotivationSection.js";

import styles from "./CohortApplicationForm.module.css";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
  onSuccess?: (receipt: CohortApplicationResponse) => void;
}

export function CohortApplicationForm({
  locale,
  cohortSlug = "cohort-2",
  onSuccess,
}: CohortApplicationFormProps) {
  const {
    formData,
    status,
    fieldErrors,
    globalError,
    receipt,
    isSubmitting,
    isAr,
    handleChange,
    handleSubmit,
  } = useCohortApplicationForm({ cohortSlug, locale, onSuccess });

  if (status === "success" && receipt) {
    return <CohortApplicationReceipt receipt={receipt} locale={locale} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {globalError && (
        <div role="alert" className={styles.globalAlert}>
          <span>⚠️</span>
          <span>{globalError}</span>
        </div>
      )}

      <PersonalInfoSection
        formData={formData}
        fieldErrors={fieldErrors}
        handleChange={handleChange}
        isAr={isAr}
      />

      <TechnicalBackgroundSection
        formData={formData}
        fieldErrors={fieldErrors}
        handleChange={handleChange}
        isAr={isAr}
      />

      <PersonalPageSection
        formData={formData}
        fieldErrors={fieldErrors}
        handleChange={handleChange}
        isAr={isAr}
      />

      <MotivationSection
        formData={formData}
        fieldErrors={fieldErrors}
        handleChange={handleChange}
        isAr={isAr}
      />

      <div className={styles.actionsBar}>
        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting
            ? isAr
              ? "جاري إرسال الطلب..."
              : "Submitting..."
            : isAr
              ? "إرسال طلب التقديم"
              : "Submit Application"}
        </button>
        <span className={styles.reassurance}>
          🔒{" "}
          {isAr
            ? "بياناتك محفوظة ولن تُستخدم إلا في إجراءات قبول ورشة العمل."
            : "Your information is secure and only used for ElWarsha admissions."}
        </span>
      </div>
    </form>
  );
}
