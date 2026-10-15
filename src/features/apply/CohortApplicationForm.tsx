
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { api } from "@core/api"
import type { ApplyCohortInput } from "@elwarsha/api-client";
import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

interface ApplicationReceipt {
  id: string;
  cohortSlug: string;
  email: string;
  status: string;
  createdAt: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  const copy = messages[locale].apply;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    github: "",
    discord: "",
    currentStatus: "",
    collegeMajor: "",
    programmingExperience: "",
    technologies: "",
    gitExperience: "",
    personalPageUrl: "",
    githubRepoUrl: "",
    aiUsage: "",
    motivation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [conflictError, setConflictError] = useState("");
  const [receipt, setReceipt] = useState<ApplicationReceipt | null>(null);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setConflictError("");
    setIsSuccess(false);
    setReceipt(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});
    setConflictError("");
    setIsSuccess(false);
    setReceipt(null);

    const {
      whatsapp,
      github,
      discord,
      ...otherFields
    } = formData;
    
    const payload = {
      ...otherFields,
      whatsappNumber: whatsapp,
      githubHandle: github,
      discordHandle: discord,
    } as ApplyCohortInput;

    try {
          const result = await api.applyCohort(_cohortSlug, payload);

      setIsSuccess(true);

      if (result?.id) {
        setReceipt(result);
      }
    } catch (err: unknown) {
      const error = err as {
        status?: number;
        invalidParams?: { name: string; reason: string }[];
        response?: {
          status?: number;
          data?: {
            status?: number;
            invalidParams?: { name: string; reason: string }[];
          };
        };
      };

      const errorData = error.response?.data ?? error;
      const status = error.response?.status ?? errorData.status;

      if (status === 422 && errorData.invalidParams) {
        const fieldErrors: Record<string, string> = {};

        const fieldNames: Record<string, string> = {
          whatsappNumber: "whatsapp",
          githubHandle: "github",
          discordHandle: "discord",
        };

        errorData.invalidParams.forEach((param) => {
          const fieldName = fieldNames[param.name] ?? param.name;
          fieldErrors[fieldName] = param.reason;
        });

        setErrors(fieldErrors);
      } else if (status === 409) {
        setConflictError(
          isAr
            ? "أنت مسجل بالفعل في هذه الدفعة"
            : "You have already applied to this cohort."
        );
      } else {
        setConflictError(
          isAr
            ? "حدث خطأ ما، يرجى المحاولة مرة أخرى."
            : "An unexpected error occurred."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (name: string) =>
    errors[name] ? (
      <span
        id={`${name}-error`}
        className={styles.errorText}
      >
        {errors[name]}
      </span>
    ) : null;

  const getFieldProps = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.placeholder}>
        <fieldset>
          <legend>
            {isAr
              ? "البيانات الشخصية والتواصل"
              : "Personal & Contact Information"}
          </legend>

          <div className={styles.field}>
            <label htmlFor="fullName">
              {isAr ? "الاسم بالكامل " : "Full Name"}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={isAr ? "الاسم بالكامل" : "Full Name"}
              required
              minLength={3}
              {...getFieldProps("fullName")}
            />
            {renderError("fullName")}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              {...getFieldProps("email")}
            />
            {renderError("email")}
          </div>

          <div className={styles.field}>
            <label htmlFor="whatsapp">
              {isAr ? "رقم واتساب " : "WhatsApp Number"}
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+201012345678"
              required
              pattern="[+]?[0-9]{10,15}"
              {...getFieldProps("whatsapp")}
            />
            {renderError("whatsapp")}
          </div>

          <div className={styles.field}>
            <label htmlFor="github">
              {isAr ? "اسم الحساب على جيت هب" : "GitHub Handle"}
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="bassanttamer3"
              required
              pattern="[A-Za-z0-9-]+"
              {...getFieldProps("github")}
            />
            {renderError("github")}
          </div>

          <div className={styles.field}>
            <label htmlFor="discord">
              {isAr ? " اسم الحساب على ديسكورد" : "Discord Handle"}
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="bassanttamer3"
              required
              {...getFieldProps("discord")}
            />
            {renderError("discord")}
          </div>
        </fieldset>

        <hr className={styles.divider} />

        <fieldset>
          <legend>
            {isAr ? "الخلفية التقنية والتعليمية" : "Technical Background"}
          </legend>

          <div className={styles.field}>
            <label htmlFor="currentStatus">
              {isAr ? "وضعك الحالي " : "Current Status"}
            </label>
            <select
              id="currentStatus"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              required
              {...getFieldProps("currentStatus")}
            >
              <option value="" disabled>
                {isAr ? "اختر الحالة الحالية" : "Select Current Status"}
              </option>
              <option value="student">
                {isAr ? "طالب" : "Student"}
              </option>
              <option value="graduate">
                {isAr ? "خريج" : "Graduate"}
              </option>
              <option value="working_in_tech">
                {isAr ? "يعمل في مجال التقنية" : "Working in tech"}
              </option>
              <option value="switching_career">
                {isAr ? "يغير مساره المهني" : "Switching career"}
              </option>
              <option value="other">
                {isAr ? "آخر" : "Other"}
              </option>
            </select>
            {renderError("currentStatus")}
          </div>

          <div className={styles.field}>
            <label htmlFor="collegeMajor">
              {isAr ? "الكلية والتخصص " : "College & Major"}
            </label>
            <input
              type="text"
              id="collegeMajor"
              name="collegeMajor"
              value={formData.collegeMajor}
              onChange={handleChange}
              placeholder={
                isAr ? "حاسبات ومعلومات" : "Faculty of Engineering, CSE"
              }
              required
              {...getFieldProps("collegeMajor")}
            />
            {renderError("collegeMajor")}
          </div>

          <div className={styles.field}>
            <label htmlFor="programmingExperience">
              {isAr
                ? "من إمتى بتتعلم برمجة؟ "
                : "Programming Experience"}
            </label>
            <input
              type="text"
              id="programmingExperience"
              name="programmingExperience"
              value={formData.programmingExperience}
              onChange={handleChange}
              placeholder={isAr ? "سنة، ٦ شهور" : "1 year, 6 months"}
              required
              {...getFieldProps("programmingExperience")}
            />
            {renderError("programmingExperience")}
          </div>

          <div className={styles.field}>
            <label htmlFor="technologies">
              {isAr ? "اللغات والتقنيات " : "Technologies Used"}
            </label>
            <textarea
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js..."
              required
              {...getFieldProps("technologies")}
            />
            {renderError("technologies")}
          </div>

          <div className={styles.field}>
            <label htmlFor="gitExperience">
              {isAr ? "استخدمت Git قبل كده؟ " : "Git Experience"}
            </label>
            <select
              id="gitExperience"
              name="gitExperience"
              value={formData.gitExperience}
              onChange={handleChange}
              required
              {...getFieldProps("gitExperience")}
            >
              <option value="" disabled>
                {isAr ? "اختر خبرة Git" : "Select Git Experience"}
              </option>
              <option value="never">
                {isAr ? "لا أبداً" : "Never"}
              </option>
              <option value="basics_only">
                {isAr ? "أساسيات فقط" : "Basics only"}
              </option>
              <option value="comfortable">
                {isAr ? "مريح" : "Comfortable"}
              </option>
            </select>
            {renderError("gitExperience")}
          </div>
        </fieldset>

        <hr className={styles.divider} />

        <fieldset>
          <legend>
            {isAr ? "مهمة الصفحة الشخصية" : "Personal Page Task"}
          </legend>

          <div className={styles.field}>
            <label htmlFor="personalPageUrl">
              {isAr
                ? "رابط الصفحة الشخصية "
                : "Published Personal Page Link"}
            </label>
            <input
              type="url"
              id="personalPageUrl"
              name="personalPageUrl"
              value={formData.personalPageUrl}
              onChange={handleChange}
              placeholder="https://..."
              required
              {...getFieldProps("personalPageUrl")}
            />
            {renderError("personalPageUrl")}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubRepoUrl">
              {isAr
                ? "لينك الريبو على GitHub "
                : "GitHub Repository Link"}
            </label>
            <input
              type="url"
              id="githubRepoUrl"
              name="githubRepoUrl"
              value={formData.githubRepoUrl}
              onChange={handleChange}
              placeholder="https://github.com/u/r"
              required
              pattern="https?://(www[.])?github[.]com/[^/]+/[^/]+/?"
              {...getFieldProps("githubRepoUrl")}
            />
            {renderError("githubRepoUrl")}
          </div>

          <div className={styles.field}>
            <label htmlFor="aiUsage">
              {isAr
                ? "استخدام أدوات الذكاء الاصطناعي "
                : "AI Usage"}
            </label>
            <textarea
              id="aiUsage"
              name="aiUsage"
              value={formData.aiUsage}
              onChange={handleChange}
              placeholder={
                isAr
                  ? "كيف استخدمت أدوات الذكاء الاصطناعي..."
                  : "How did you use AI tools..."
              }
              required
              {...getFieldProps("aiUsage")}
            />
            {renderError("aiUsage")}
          </div>
        </fieldset>

        <hr className={styles.divider} />

        <fieldset>
          <legend>{isAr ? "الدافع والالتزام" : "Motivation"}</legend>

          <div className={styles.field}>
            <label htmlFor="motivation">
              {isAr
                ? "ليه عايز تدخل البرنامج ده تحديدًا؟ "
                : "Why do you want to join this program?"}
            </label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder={
                isAr
                  ? "لماذا تريد الانضمام لهذا البرنامج؟ (على الأقل 50 حرف)"
                  : "Why do you want to join this program? (At least 50 characters)"
              }
              required
              minLength={50}
              aria-invalid={Boolean(errors.motivation)}
              aria-describedby={[
                "motivation-counter",
                errors.motivation ? "motivation-error" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <p id="motivation-counter" aria-live="polite">
              {formData.motivation.length} / 50
            </p>
            {renderError("motivation")}
          </div>
        </fieldset>
      </div>

      {conflictError && (
        <p className={styles.errorText} role="alert">
          {conflictError}
        </p>
      )}

      {isSuccess && (
        <div className={styles.receiptCard} role="status">
          <p>
            {isAr
              ? "تم إرسال طلبك بنجاح."
              : "Your application was submitted successfully."}
          </p>

          {receipt && (
            <>
              <p>
                {isAr ? "رقم الطلب: " : "Application ID: "}
                {receipt.id}
              </p>
              <p>
                {isAr ? "البريد الإلكتروني: " : "Email: "}
                {receipt.email}
              </p>
              <p>
                {isAr ? "الحالة: " : "Status: "}
                {receipt.status}
              </p>
              <p>
                {isAr ? "تاريخ الإرسال: " : "Submitted at: "}
                {new Date(receipt.createdAt).toLocaleString(
                  isAr ? "ar-EG" : "en-US"
                )}
              </p>
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? isAr
            ? "جارٍ الإرسال..."
            : "Submitting..."
          : copy.submit}
      </button>
    </form>
  );
}
