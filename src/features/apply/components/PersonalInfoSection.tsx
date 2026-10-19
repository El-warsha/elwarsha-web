import type { ChangeEvent } from "react";
import type { ApplyCohortInput } from "@core/api";
import styles from "../CohortApplicationForm.module.css";

export interface PersonalInfoSectionProps {
  formData: ApplyCohortInput;
  fieldErrors: Record<string, string>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isAr: boolean;
}

export function PersonalInfoSection({
  formData,
  fieldErrors,
  handleChange,
  isAr,
}: PersonalInfoSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span className={styles.legendBadge}>01</span>
        <span>
          {isAr
            ? "القسم الأول: البيانات الشخصية والتواصل"
            : "Section 1: Personal & Contact Information"}
        </span>
      </legend>
      <p className={styles.sectionHint}>
        {isAr
          ? "البيانات الأساسية للتواصل ومتابعة طلب التقديم."
          : "Primary contact details to reach you with application updates."}
      </p>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="fullName">
            <span>{isAr ? "الاسم بالكامل" : "Full Name"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder={isAr ? "مثال: أحمد محمد علي" : "e.g. Sara Mahmoud"}
            className={`${styles.input} ${fieldErrors.fullName ? styles.inputError : ""}`}
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
          />
          {fieldErrors.fullName && (
            <span id="fullName-error" role="alert" className={styles.errorText}>
              {fieldErrors.fullName}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            <span>{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <span id="email-error" role="alert" className={styles.errorText}>
              {fieldErrors.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="whatsappNumber">
            <span>{isAr ? "رقم واتساب" : "WhatsApp Number"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="whatsappNumber"
            name="whatsappNumber"
            type="tel"
            required
            placeholder="+201012345678"
            className={`${styles.input} ${fieldErrors.whatsappNumber ? styles.inputError : ""}`}
            value={formData.whatsappNumber}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.whatsappNumber)}
            aria-describedby={
              fieldErrors.whatsappNumber ? "whatsappNumber-error" : undefined
            }
          />
          {fieldErrors.whatsappNumber && (
            <span id="whatsappNumber-error" role="alert" className={styles.errorText}>
              {fieldErrors.whatsappNumber}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="githubHandle">
            <span>{isAr ? "اسم الحساب على GitHub" : "GitHub Handle"}</span>
            <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="githubHandle"
            name="githubHandle"
            type="text"
            required
            placeholder="octocat"
            className={`${styles.input} ${fieldErrors.githubHandle ? styles.inputError : ""}`}
            value={formData.githubHandle}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.githubHandle)}
            aria-describedby={
              fieldErrors.githubHandle ? "githubHandle-error" : undefined
            }
          />
          {fieldErrors.githubHandle && (
            <span id="githubHandle-error" role="alert" className={styles.errorText}>
              {fieldErrors.githubHandle}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="discordHandle">
          <span>{isAr ? "اسم الحساب على Discord" : "Discord Handle"}</span>
          <span className={styles.requiredMark}>*</span>
        </label>
        <input
          id="discordHandle"
          name="discordHandle"
          type="text"
          required
          placeholder="username"
          className={`${styles.input} ${fieldErrors.discordHandle ? styles.inputError : ""}`}
          value={formData.discordHandle}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.discordHandle)}
          aria-describedby={
            fieldErrors.discordHandle ? "discordHandle-error" : undefined
          }
        />
        {fieldErrors.discordHandle && (
          <span id="discordHandle-error" role="alert" className={styles.errorText}>
            {fieldErrors.discordHandle}
          </span>
        )}
      </div>
    </fieldset>
  );
}
