import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";
import { TextInputField } from "@ui/components/TextInputField/TextInputField";
import { TextAreaField } from "@ui/components/TextAreaField/TextAreaField";
import FormSection from "../FormSection/FormSection";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  const copy = messages[locale].apply;

  return (
    <form className={styles.form}>
      {/* TODO (Week 2): Implement the 4 fieldsets, inputs, and validation contract */}
      <div className={styles.placeholder}>
        <p>
          {isAr
            ? "استمارة التقديم — قيد الإنشاء (مهمة الأسبوع الثاني)"
            : "Application form under construction (Week 2 Task)"}
        </p>
        <FormSection sectionNumber={1} sectionSubtitle="Primary contact details to reach you" sectionTitle="Personal & contact information">
        <TextInputField label="full name" required></TextInputField>
     <TextAreaField label="your experinece" required></TextAreaField>
     </FormSection>
      </div>
      <button type="submit" className={styles.submitButton}>
        {copy.submit}
      </button>
    </form>
  );
}
