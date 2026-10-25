import type { ChangeEvent } from "react";
import type { ApplyCohortInput } from "@core/api";
import styles from "../CohortApplicationForm.module.css";

export interface MotivationSectionProps {
  formData: ApplyCohortInput;
  fieldErrors: Record<string, string>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  isAr: boolean;
}

export function MotivationSection({
  formData,
  fieldErrors,
  handleChange,
  isAr,
}: MotivationSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span className={styles.legendBadge}>04</span>
        <span>
          {isAr ? "القسم الرابع: الدافع والالتزام" : "Section 4: Motivation & Commitment"}
        </span>
      </legend>
      <p className={styles.sectionHint}>
        {isAr
          ? "نود معرفة شغفك واستعدادك الحقيقي للعمل الجماعي وتخصيص الوقت الأسبوعي."
          : "Tell us about your drive and readiness to commit time and collaborate with peers."}
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="motivation">
          <span>
            {isAr
              ? "ليه عايز تدخل البرنامج ده تحديدًا؟ (٥٠ حرف على الأقل)"
              : "Why do you want to join this program specifically? (Min 50 chars)"}
          </span>
          <span className={styles.requiredMark}>*</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows={4}
          required
          placeholder={
            isAr
              ? "احكي لنا عن هدفك، واستعدادك لتخصيص الوقت المطلوب وتسليم التحديات الأسبوعية..."
              : "Tell us about your goals and readiness for weekly deliverables..."
          }
          className={`${styles.textarea} ${fieldErrors.motivation ? styles.inputError : ""}`}
          value={formData.motivation}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.motivation)}
          aria-describedby={fieldErrors.motivation ? "motivation-error" : undefined}
        />
        {fieldErrors.motivation && (
          <span id="motivation-error" role="alert" className={styles.errorText}>
            {fieldErrors.motivation}
          </span>
        )}
        <span className={styles.helperText}>
          {isAr
            ? `عدد الحروف الحالية: ${formData.motivation.length} (الحد الأدنى ٥٠)`
            : `Current character count: ${formData.motivation.length} (Minimum 50)`}
        </span>
      </div>
    </fieldset>
  );
}
