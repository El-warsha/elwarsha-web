import type { ChangeEvent } from "react";
import type { ApplyCohortInput } from "@core/api";
import styles from "../CohortApplicationForm.module.css";

export interface PersonalPageSectionProps {
  formData: ApplyCohortInput;
  fieldErrors: Record<string, string>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isAr: boolean;
}

export function PersonalPageSection({
  formData,
  fieldErrors,
  handleChange,
  isAr,
}: PersonalPageSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span className={styles.legendBadge}>03</span>
        <span>
          {isAr ? "القسم الثالث: مهمة الصفحة الشخصية" : "Section 3: Personal Page Task"}
        </span>
      </legend>
      <p className={styles.sectionHint}>
        {isAr
          ? "رابط صفحتك الشخصية ومستودع الكود كإثبات على إنجاز التحدي التمهيدي."
          : "Your published personal site and repository link proving completion of the prep challenge."}
      </p>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="personalPageUrl">
            <span>
              {isAr ? "رابط الصفحة الشخصية المنشورة" : "Published Personal Page Link"}
            </span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="personalPageUrl"
            name="personalPageUrl"
            type="url"
            required
            placeholder="https://username.github.io"
            className={`${styles.input} ${fieldErrors.personalPageUrl ? styles.inputError : ""}`}
            value={formData.personalPageUrl}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.personalPageUrl)}
            aria-describedby={
              fieldErrors.personalPageUrl ? "personalPageUrl-error" : undefined
            }
          />
          {fieldErrors.personalPageUrl && (
            <span id="personalPageUrl-error" role="alert" className={styles.errorText}>
              {fieldErrors.personalPageUrl}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="githubRepoUrl">
            <span>{isAr ? "لينك الريبو على GitHub" : "GitHub Repository Link"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="githubRepoUrl"
            name="githubRepoUrl"
            type="url"
            required
            placeholder="https://github.com/username/my-page"
            className={`${styles.input} ${fieldErrors.githubRepoUrl ? styles.inputError : ""}`}
            value={formData.githubRepoUrl}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.githubRepoUrl)}
            aria-describedby={
              fieldErrors.githubRepoUrl ? "githubRepoUrl-error" : undefined
            }
          />
          {fieldErrors.githubRepoUrl && (
            <span id="githubRepoUrl-error" role="alert" className={styles.errorText}>
              {fieldErrors.githubRepoUrl}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="aiUsage">
          <span>
            {isAr
              ? "استخدمت أدوات الذكاء الاصطناعي في عمل الصفحة؟"
              : "Did you use AI tools to build the page?"}
          </span>
          <span className={styles.requiredMark}>*</span>
        </label>
        <textarea
          id="aiUsage"
          name="aiUsage"
          rows={2}
          required
          placeholder={
            isAr
              ? "مثال: نعم، استخدمت Cursor في الإكمال وClaude في الاستفسار وفهم الأخطاء / لا، كتبتها يدوياً"
              : "e.g. Yes, used Cursor for autocompletion / No, wrote it manually"
          }
          className={`${styles.textarea} ${fieldErrors.aiUsage ? styles.inputError : ""}`}
          value={formData.aiUsage}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.aiUsage)}
          aria-describedby={fieldErrors.aiUsage ? "aiUsage-error" : undefined}
        />
        {fieldErrors.aiUsage && (
          <span id="aiUsage-error" role="alert" className={styles.errorText}>
            {fieldErrors.aiUsage}
          </span>
        )}
      </div>
    </fieldset>
  );
}
