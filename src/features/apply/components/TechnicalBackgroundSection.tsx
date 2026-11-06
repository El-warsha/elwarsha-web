import type { ChangeEvent } from "react";
import type { ApplyCohortInput } from "@core/api";
import styles from "../CohortApplicationForm.module.css";

export interface TechnicalBackgroundSectionProps {
  formData: ApplyCohortInput;
  fieldErrors: Record<string, string>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  isAr: boolean;
}

export function TechnicalBackgroundSection({
  formData,
  fieldErrors,
  handleChange,
  isAr,
}: TechnicalBackgroundSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span className={styles.legendBadge}>02</span>
        <span>
          {isAr
            ? "القسم الثاني: الخلفية التقنية والتعليمية"
            : "Section 2: Academic & Technical Background"}
        </span>
      </legend>
      <p className={styles.sectionHint}>
        {isAr
          ? "نظرة على خبرتك التقنية لمساعدتنا في تنظيم وتوزيع الفرق بفاعلية."
          : "Your technical background to help us balance and organize engineering pods."}
      </p>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="currentStatus">
            <span>{isAr ? "وضعك الحالي" : "Current Status"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <select
            id="currentStatus"
            name="currentStatus"
            className={styles.select}
            value={formData.currentStatus}
            onChange={handleChange}
          >
            <option value="student">{isAr ? "طالب جامعي" : "University Student"}</option>
            <option value="recent_graduate">
              {isAr ? "خريج حديث" : "Recent Graduate"}
            </option>
            <option value="employed_tech">
              {isAr ? "أعمل حالياً في المجال" : "Employed in Tech"}
            </option>
            <option value="career_switcher">
              {isAr
                ? "أعمل في مجال آخر وأرغب في التحويل للبرمجة"
                : "Career Switcher to Tech"}
            </option>
            <option value="other">{isAr ? "غير ذلك" : "Other"}</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="collegeMajor">
            <span>{isAr ? "الكلية والتخصص" : "College & Major"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="collegeMajor"
            name="collegeMajor"
            type="text"
            required
            placeholder={
              isAr ? "حاسبات ومعلومات - علوم حاسب" : "Faculty of Computer Science"
            }
            className={`${styles.input} ${fieldErrors.collegeMajor ? styles.inputError : ""}`}
            value={formData.collegeMajor}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.collegeMajor)}
            aria-describedby={fieldErrors.collegeMajor ? "collegeMajor-error" : undefined}
          />
          {fieldErrors.collegeMajor && (
            <span id="collegeMajor-error" role="alert" className={styles.errorText}>
              {fieldErrors.collegeMajor}
            </span>
          )}
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="programmingExperience">
            <span>{isAr ? "من إمتى وانت بتتعلم برمجة؟" : "Programming Experience"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="programmingExperience"
            name="programmingExperience"
            type="text"
            required
            placeholder={isAr ? "سنة، سنتين، ٦ شهور..." : "e.g. 1 year, 6 months"}
            className={`${styles.input} ${fieldErrors.programmingExperience ? styles.inputError : ""}`}
            value={formData.programmingExperience}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.programmingExperience)}
            aria-describedby={
              fieldErrors.programmingExperience
                ? "programmingExperience-error"
                : undefined
            }
          />
          {fieldErrors.programmingExperience && (
            <span
              id="programmingExperience-error"
              role="alert"
              className={styles.errorText}
            >
              {fieldErrors.programmingExperience}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gitExperience">
            <span>{isAr ? "استخدمت Git قبل كده؟" : "Git Experience"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <select
            id="gitExperience"
            name="gitExperience"
            className={styles.select}
            value={formData.gitExperience}
            onChange={handleChange}
          >
            <option value="none">{isAr ? "لم أستخدمه من قبل" : "Never used it"}</option>
            <option value="basics">
              {isAr
                ? "أعرف الأوامر البسيطة فقط (add, commit, push)"
                : "Basic commands only"}
            </option>
            <option value="comfortable">
              {isAr
                ? "أستخدمه بانتظام ومستريح مع branches و PRs"
                : "Comfortable with branches & PRs"}
            </option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="technologies">
          <span>
            {isAr
              ? "اللغات والتقنيات اللي اشتغلت بيها فعليًا (مش بس اتفرجت عليها)"
              : "Technologies & languages you’ve actually built with"}
          </span>
          <span className={styles.requiredMark}>*</span>
        </label>
        <textarea
          id="technologies"
          name="technologies"
          rows={3}
          required
          placeholder="JavaScript, TypeScript, React, Express, PostgreSQL..."
          className={`${styles.textarea} ${fieldErrors.technologies ? styles.inputError : ""}`}
          value={formData.technologies}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.technologies)}
          aria-describedby={fieldErrors.technologies ? "technologies-error" : undefined}
        />
        {fieldErrors.technologies && (
          <span id="technologies-error" role="alert" className={styles.errorText}>
            {fieldErrors.technologies}
          </span>
        )}
      </div>
    </fieldset>
  );
}
