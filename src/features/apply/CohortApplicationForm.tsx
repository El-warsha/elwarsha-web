import { api, ElWarshaApiError, type ApplyCohortInput } from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { useCallback, useState } from "react";

import styles from "./CohortApplicationForm.module.css";
import {
  validateAll,
  validateField,
  type FieldKey,
  type ValidationErrors,
} from "./validation.js";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

// Use the api-client's own type — no drift between form and network layer.
type FormValues = ApplyCohortInput;

type FieldStatus = "touched";

type Receipt = {
  id: string;
  cohortSlug: string;
  email: string;
  status: string;
  createdAt: string;
};

// Match the api-client unions exactly.
const CURRENT_STATUS_OPTIONS = [
  "student",
  "recent_graduate",
  "employed_tech",
  "career_switcher",
  "other",
] as const;

const GIT_EXPERIENCE_OPTIONS = ["none", "basics", "comfortable"] as const;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  githubHandle: "",
  discordHandle: "",
  currentStatus: "student",
  collegeMajor: "",
  programmingExperience: "",
  technologies: "",
  gitExperience: "none",
  personalPageUrl: "",
  githubRepoUrl: "",
  aiUsage: "",
  motivation: "",
};

const ALL_FIELD_KEYS = Object.keys(INITIAL_VALUES) as FieldKey[];

const FIELDS = {
  fullName: { ar: "الاسم بالكامل", en: "Full Name" },
  email: { ar: "البريد الإلكتروني", en: "Email Address" },
  whatsappNumber: { ar: "رقم واتساب", en: "WhatsApp Number" },
  githubHandle: { ar: "اسم الحساب على GitHub", en: "GitHub Handle" },
  discordHandle: { ar: "اسم الحساب على Discord", en: "Discord Handle" },
  currentStatus: { ar: "وضعك الحالي", en: "Current Status" },
  collegeMajor: { ar: "الكلية والتخصص", en: "College & Major" },
  programmingExperience: {
    ar: "من إمتى وانت بتتعلم برمجة؟",
    en: "Programming Experience",
  },
  technologies: {
    ar: "اللغات والتقنيات اللي اشتغلت بيها فعليًا",
    en: "Technologies Used",
  },
  gitExperience: { ar: "استخدمت Git قبل كده؟", en: "Git Experience" },
  personalPageUrl: {
    ar: "رابط الصفحة الشخصية المنشورة",
    en: "Published Personal Page Link",
  },
  githubRepoUrl: {
    ar: "لينك الريبو على GitHub",
    en: "GitHub Repository Link",
  },
  aiUsage: {
    ar: "استخدمت أدوات الذكاء الاصطناعي في عمل الصفحة؟",
    en: "AI Usage",
  },
  motivation: {
    ar: "ليه عايز تدخل البرنامج ده تحديدًا؟",
    en: "Motivation",
  },
} as const;

const SECTION_LABELS = {
  personal: {
    ar: "البيانات الشخصية والتواصل",
    en: "Personal & Contact Information",
  },
  technical: { ar: "الخلفية التقنية والتعليمية", en: "Technical Background" },
  pageTask: { ar: "مهمة الصفحة الشخصية", en: "Personal Page Task" },
  motivation: { ar: "الدافع والالتزام", en: "Motivation" },
} as const;

const UI_COPY = {
  ar: {
    submitting: "جاري الإرسال…",
    successTitle: "تم استلام طلبك",
    successBody: "شكرًا لك! تم استلام طلبك وسنراجعه قريبًا.",
    receiptId: "رقم الطلب",
    receiptEmail: "البريد الإلكتروني",
    receiptStatus: "الحالة",
    receiptCreatedAt: "تاريخ الإرسال",
    duplicate: "يوجد طلب مسجل بالفعل بنفس البريد الإلكتروني أو اسم GitHub لهذه الدفعة.",
    genericError: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.",
    motivationCounter: "الحروف المدخلة",
    motivationHint: "الحد الأدنى ٥٠ حرفًا",
    statusLabels: {
      student: "طالب",
      recent_graduate: "خريج حديث",
      employed_tech: "أعمل في مجال التقنية",
      career_switcher: "أتحول من مجال آخر",
      other: "أخرى",
    } as Record<string, string>,
    gitLabels: {
      none: "لم أستخدمه",
      basics: "الأساسيات فقط",
      comfortable: "مرتاح في استخدامه",
    } as Record<string, string>,
  },
  en: {
    submitting: "Submitting…",
    successTitle: "Application received",
    successBody: "Thank you! We've received your application and will review it soon.",
    receiptId: "Application ID",
    receiptEmail: "Email",
    receiptStatus: "Status",
    receiptCreatedAt: "Submitted at",
    duplicate:
      "An application with this email or GitHub handle already exists for this cohort.",
    genericError: "Something went wrong while submitting. Please try again.",
    motivationCounter: "Characters",
    motivationHint: "Minimum 50 characters",
    statusLabels: {
      student: "Student",
      recent_graduate: "Recent graduate",
      employed_tech: "Working in tech",
      career_switcher: "Switching career",
      other: "Other",
    } as Record<string, string>,
    gitLabels: {
      none: "Never",
      basics: "Basics only",
      comfortable: "Comfortable",
    } as Record<string, string>,
  },
} as const;

export function CohortApplicationForm({
  locale,
  cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  const copy = messages[locale].apply;
  const ui = UI_COPY[locale];

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, FieldStatus>>>({});
  const [conflict, setConflict] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  /**
   * Recomputes a field's error. Honors the touched state:
   * - untouched → do nothing (don't yell while the user is typing first time)
   * - touched   → set or clear the error for that field
   */
  const refreshFieldError = useCallback(
    (key: FieldKey, value: string, isTouched: boolean) => {
      if (!isTouched) return;
      const reason = validateField(key, value, locale);
      setErrors((prev) => {
        const next = { ...prev };
        if (reason) {
          next[key] = reason;
        } else {
          delete next[key];
        }
        return next;
      });
    },
    [locale],
  );

  const updateField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    refreshFieldError(key as FieldKey, String(value), Boolean(touched[key as FieldKey]));
    if (conflict) setConflict(null);
  };

  const handleBlur = (key: FieldKey) => {
    setTouched((prev) =>
      prev[key] === "touched" ? prev : { ...prev, [key]: "touched" },
    );
    refreshFieldError(key, values[key], true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    // Mark everything touched so all field errors become visible.
    setTouched(
      Object.fromEntries(ALL_FIELD_KEYS.map((k) => [k, "touched"])) as Record<
        FieldKey,
        FieldStatus
      >,
    );

    // Client-side validation gate before hitting the network.
    const clientErrors = validateAll(values, locale);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setConflict(null);
      setState("error");
      const firstKey = Object.keys(clientErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setState("submitting");
    setErrors({});
    setConflict(null);

    try {
      const data = await api.applyCohort(cohortSlug, values);
      setReceipt(data);
      setState("success");
    } catch (err: unknown) {
      if (err instanceof ElWarshaApiError) {
        // 422 — validation: map invalidParams under each field
        if (err.status === 422 && Array.isArray(err.body?.invalidParams)) {
          const nextErrors: ValidationErrors = {};
          for (const param of err.body.invalidParams) {
            if (param.name in INITIAL_VALUES && !nextErrors[param.name as FieldKey]) {
              nextErrors[param.name as FieldKey] = param.reason;
            }
          }
          setErrors(nextErrors);
          setState("error");
          return;
        }

        // 409 — duplicate application
        if (err.status === 409) {
          setConflict(ui.duplicate);
          setState("error");
          return;
        }
      }

      setConflict(ui.genericError);
      setState("error");
    }
  };

  if (state === "success" && receipt) {
    return (
      <section className={styles.receipt} role="status" aria-live="polite">
        <h2 className={styles.receiptTitle}>{ui.successTitle}</h2>
        <p className={styles.receiptBody}>{ui.successBody}</p>
        <dl className={styles.receiptList}>
          <div>
            <dt>{ui.receiptId}</dt>
            <dd>{receipt.id}</dd>
          </div>
          <div>
            <dt>{ui.receiptEmail}</dt>
            <dd>{receipt.email}</dd>
          </div>
          <div>
            <dt>{ui.receiptStatus}</dt>
            <dd>{receipt.status}</dd>
          </div>
          <div>
            <dt>{ui.receiptCreatedAt}</dt>
            <dd>{new Date(receipt.createdAt).toLocaleString(locale)}</dd>
          </div>
        </dl>
      </section>
    );
  }

  const motivationCount = values.motivation.length;
  const motivationOk = motivationCount >= 50;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {conflict && (
        <div className={styles.alert} role="alert">
          {conflict}
        </div>
      )}

      {/* ---------- Section 1: Personal & Contact ---------- */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {isAr ? SECTION_LABELS.personal.ar : SECTION_LABELS.personal.en}
        </legend>

        <TextField
          id="fullName"
          label={isAr ? FIELDS.fullName.ar : FIELDS.fullName.en}
          value={values.fullName}
          error={errors.fullName}
          onChange={(v) => updateField("fullName", v)}
          onBlur={() => handleBlur("fullName")}
          required
        />
        <TextField
          id="email"
          type="email"
          label={isAr ? FIELDS.email.ar : FIELDS.email.en}
          value={values.email}
          error={errors.email}
          onChange={(v) => updateField("email", v)}
          onBlur={() => handleBlur("email")}
          required
        />
        <TextField
          id="whatsappNumber"
          type="tel"
          label={isAr ? FIELDS.whatsappNumber.ar : FIELDS.whatsappNumber.en}
          value={values.whatsappNumber}
          error={errors.whatsappNumber}
          onChange={(v) => updateField("whatsappNumber", v)}
          onBlur={() => handleBlur("whatsappNumber")}
          placeholder="+201012345678"
          required
        />
        <TextField
          id="githubHandle"
          label={isAr ? FIELDS.githubHandle.ar : FIELDS.githubHandle.en}
          value={values.githubHandle}
          error={errors.githubHandle}
          onChange={(v) => updateField("githubHandle", v)}
          onBlur={() => handleBlur("githubHandle")}
          placeholder="octocat"
          required
        />
        <TextField
          id="discordHandle"
          label={isAr ? FIELDS.discordHandle.ar : FIELDS.discordHandle.en}
          value={values.discordHandle}
          error={errors.discordHandle}
          onChange={(v) => updateField("discordHandle", v)}
          onBlur={() => handleBlur("discordHandle")}
          required
        />
      </fieldset>

      {/* ---------- Section 2: Technical Background ---------- */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {isAr ? SECTION_LABELS.technical.ar : SECTION_LABELS.technical.en}
        </legend>

        <SelectField
          id="currentStatus"
          label={isAr ? FIELDS.currentStatus.ar : FIELDS.currentStatus.en}
          value={values.currentStatus}
          error={errors.currentStatus}
          onChange={(v) => updateField("currentStatus", v as FormValues["currentStatus"])}
          onBlur={() => handleBlur("currentStatus")}
          options={CURRENT_STATUS_OPTIONS.map((value) => ({
            value,
            label: ui.statusLabels[value] ?? value,
          }))}
          required
        />
        <TextField
          id="collegeMajor"
          label={isAr ? FIELDS.collegeMajor.ar : FIELDS.collegeMajor.en}
          value={values.collegeMajor}
          error={errors.collegeMajor}
          onChange={(v) => updateField("collegeMajor", v)}
          onBlur={() => handleBlur("collegeMajor")}
          required
        />
        <TextField
          id="programmingExperience"
          label={isAr ? FIELDS.programmingExperience.ar : FIELDS.programmingExperience.en}
          value={values.programmingExperience}
          error={errors.programmingExperience}
          onChange={(v) => updateField("programmingExperience", v)}
          onBlur={() => handleBlur("programmingExperience")}
          required
        />
        <TextareaField
          id="technologies"
          label={isAr ? FIELDS.technologies.ar : FIELDS.technologies.en}
          value={values.technologies}
          error={errors.technologies}
          onChange={(v) => updateField("technologies", v)}
          onBlur={() => handleBlur("technologies")}
          required
        />
        <SelectField
          id="gitExperience"
          label={isAr ? FIELDS.gitExperience.ar : FIELDS.gitExperience.en}
          value={values.gitExperience}
          error={errors.gitExperience}
          onChange={(v) => updateField("gitExperience", v as FormValues["gitExperience"])}
          onBlur={() => handleBlur("gitExperience")}
          options={GIT_EXPERIENCE_OPTIONS.map((value) => ({
            value,
            label: ui.gitLabels[value] ?? value,
          }))}
          required
        />
      </fieldset>

      {/* ---------- Section 3: Personal Page Task ---------- */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {isAr ? SECTION_LABELS.pageTask.ar : SECTION_LABELS.pageTask.en}
        </legend>

        <TextField
          id="personalPageUrl"
          type="url"
          label={isAr ? FIELDS.personalPageUrl.ar : FIELDS.personalPageUrl.en}
          value={values.personalPageUrl}
          error={errors.personalPageUrl}
          onChange={(v) => updateField("personalPageUrl", v)}
          onBlur={() => handleBlur("personalPageUrl")}
          placeholder="https://"
          required
        />
        <TextField
          id="githubRepoUrl"
          type="url"
          label={isAr ? FIELDS.githubRepoUrl.ar : FIELDS.githubRepoUrl.en}
          value={values.githubRepoUrl}
          error={errors.githubRepoUrl}
          onChange={(v) => updateField("githubRepoUrl", v)}
          onBlur={() => handleBlur("githubRepoUrl")}
          placeholder="https://github.com/user/repo"
          required
        />
        <TextareaField
          id="aiUsage"
          label={isAr ? FIELDS.aiUsage.ar : FIELDS.aiUsage.en}
          value={values.aiUsage}
          error={errors.aiUsage}
          onChange={(v) => updateField("aiUsage", v)}
          onBlur={() => handleBlur("aiUsage")}
          required
        />
      </fieldset>

      {/* ---------- Section 4: Motivation ---------- */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {isAr ? SECTION_LABELS.motivation.ar : SECTION_LABELS.motivation.en}
        </legend>

        <TextareaField
          id="motivation"
          label={isAr ? FIELDS.motivation.ar : FIELDS.motivation.en}
          value={values.motivation}
          error={errors.motivation}
          onChange={(v) => updateField("motivation", v)}
          onBlur={() => handleBlur("motivation")}
          required
        />
        <div
          className={`${styles.counter} ${motivationOk ? styles.counterOk : ""}`}
          aria-live="polite"
        >
          <span>
            {ui.motivationCounter}: {motivationCount} / 50
          </span>
          <span className={styles.counterHint}>{ui.motivationHint}</span>
        </div>
      </fieldset>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={state === "submitting"}
      >
        {state === "submitting" ? ui.submitting : copy.submit}
      </button>
    </form>
  );
}

// ---------- Reusable fields ----------

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  required,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={error ? `${styles.input} ${styles.inputError}` : styles.input}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required={required}
      />
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type TextareaFieldProps = Omit<TextFieldProps, "type" | "placeholder">;

function TextareaField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  required,
}: TextareaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={4}
        className={error ? `${styles.textarea} ${styles.inputError}` : styles.textarea}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required={required}
      />
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  options,
  required,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={error ? `${styles.select} ${styles.inputError}` : styles.select}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required={required}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
