import { useState, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import {
  api,
  ElWarshaApiError,
  type CurrentStatus,
  type GitExperience,
  type CohortApplicationResponse,
} from "@core/api";
import { messages, type Locale } from "@core/i18n";
import { toast } from "@core/toast";
import styles from "./CohortApplicationForm.module.css";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export interface CohortFormValues {
  fullName: string;
  email: string;
  whatsappNumber: string;
  githubHandle: string;
  discordHandle: string;
  currentStatus: CurrentStatus | "";
  collegeMajor: string;
  programmingExperience: string;
  technologies: string[];
  gitExperience: GitExperience | "";
  personalPageUrl: string;
  githubRepoUrl: string;
  aiUsage: string;
  motivation: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  const copy = messages[locale].apply;

  const [receipt, setReceipt] = useState<CohortApplicationResponse | null>(null);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CohortFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      githubHandle: "",
      discordHandle: "",
      currentStatus: "",
      collegeMajor: "",
      programmingExperience: "",
      technologies: [],
      gitExperience: "",
      personalPageUrl: "",
      githubRepoUrl: "",
      aiUsage: "",
      motivation: "",
    },
  });

  const technologies = watch("technologies");
  const motivationText = watch("motivation") || "";
  const isMotivationValid = motivationText.length >= 50;

  const addTag = (text?: string) => {
    const value = (text ?? tagInput).trim();
    if (!value) return;
    if (!technologies.includes(value)) {
      const updated = [...technologies, value];
      setValue("technologies", updated, { shouldValidate: true });
      clearErrors("technologies");
    }
    setTagInput("");
  };

  const removeTag = (indexToRemove: number) => {
    const updated = technologies.filter((_, i) => i !== indexToRemove);
    setValue("technologies", updated, { shouldValidate: true });
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && technologies.length > 0) {
      removeTag(technologies.length - 1);
    }
  };

  const onFieldChange = (name: keyof CohortFormValues) => {
    if (errors[name]) {
      clearErrors(name);
    }
  };

  const onSubmit = async (values: CohortFormValues) => {
    let finalTech = values.technologies;
    const pendingTag = tagInput.trim();
    if (pendingTag && !finalTech.includes(pendingTag)) {
      finalTech = [...finalTech, pendingTag];
      setValue("technologies", finalTech);
      setTagInput("");
    }

    try {
      const response = await api.applyCohort(cohortSlug, {
        ...values,
        currentStatus: values.currentStatus as CurrentStatus,
        gitExperience: values.gitExperience as GitExperience,
        technologies: finalTech,
      });
      setReceipt(response);
    } catch (err) {
      if (err instanceof ElWarshaApiError) {
        if (err.status === 422 && err.body?.invalidParams) {
          err.body.invalidParams.forEach((param) => {
            setError(param.name as keyof CohortFormValues, {
              type: "server",
              message: param.reason,
            });
          });
          return;
        }

        if (err.status === 409) {
          const conflictMsg =
            err.body?.detail ||
            (isAr
              ? "تم تقديم طلب بهذا البريد الإلكتروني أو حساب GitHub مسبقاً."
              : "An application with this email or GitHub handle already exists for Cohort 2");
          toast.error(conflictMsg);
          return;
        }
      }

      toast.error(
        isAr
          ? "حدث خطأ غير متوقع أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  if (receipt) {
    return (
      <div
        className={styles.receiptCard}
        role="region"
        aria-label={isAr ? "إيصال التقديم" : "Application receipt"}
      >
        <div className={styles.receiptHeader}>
          <span className={styles.receiptIcon}>✨</span>
          <h2 className={styles.receiptTitle}>
            {isAr ? "تم استلام طلبك بنجاح!" : "Application Received Successfully!"}
          </h2>
        </div>
        <p className={styles.receiptMessage}>
          {isAr
            ? "شكراً لتقديمك للانضمام إلى الورشة. سنراجع بياناتك ونتواصل معك عبر البريد الإلكتروني."
            : "Thank you for applying. We will review your application and reach out via email."}
        </p>
        <dl className={styles.receiptDetails}>
          <dt>{isAr ? "رقم الطلب:" : "Application ID:"}</dt>
          <dd>{receipt.id}</dd>
          <dt>{isAr ? "الدفعة:" : "Cohort:"}</dt>
          <dd>{receipt.cohortSlug}</dd>
          <dt>{isAr ? "البريد الإلكتروني:" : "Email:"}</dt>
          <dd>{receipt.email}</dd>
          <dt>{isAr ? "الحالة:" : "Status:"}</dt>
          <dd>{receipt.status}</dd>
          <dt>{isAr ? "تاريخ التقديم:" : "Submission Date:"}</dt>
          <dd>{new Date(receipt.createdAt).toLocaleString(isAr ? "ar-EG" : "en-US")}</dd>
        </dl>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Section 1: Personal & Contact Information */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>1</span>
          <span>
            {isAr ? "البيانات الشخصية والتواصل" : "Personal & Contact Information"}
          </span>
        </legend>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="fullName" className={styles.label}>
              {isAr ? "الاسم بالكامل" : "Full Name"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={isAr ? "مثال: محمد علي" : "e.g. Mohamed Ali"}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`${styles.input} ${errors.fullName ? styles.hasError : ""}`}
              {...register("fullName", { onChange: () => onFieldChange("fullName") })}
            />
            {errors.fullName && (
              <p id="fullName-error" className={styles.errorText} role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              {isAr ? "البريد الإلكتروني" : "Email Address"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${styles.input} ${errors.email ? styles.hasError : ""}`}
              {...register("email", { onChange: () => onFieldChange("email") })}
            />
            {errors.email && (
              <p id="email-error" className={styles.errorText} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="whatsappNumber" className={styles.label}>
              {isAr ? "رقم واتساب" : "WhatsApp Number"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="whatsappNumber"
              type="tel"
              placeholder="+201012345678"
              aria-invalid={Boolean(errors.whatsappNumber)}
              aria-describedby={
                errors.whatsappNumber ? "whatsappNumber-error" : undefined
              }
              className={`${styles.input} ${errors.whatsappNumber ? styles.hasError : ""}`}
              {...register("whatsappNumber", {
                onChange: () => onFieldChange("whatsappNumber"),
              })}
            />
            {errors.whatsappNumber && (
              <p id="whatsappNumber-error" className={styles.errorText} role="alert">
                {errors.whatsappNumber.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubHandle" className={styles.label}>
              {isAr ? "اسم الحساب على GitHub" : "GitHub Handle"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="githubHandle"
              type="text"
              placeholder={
                isAr ? "octocat (اسم المستخدم فقط)" : "octocat (username only)"
              }
              aria-invalid={Boolean(errors.githubHandle)}
              aria-describedby={errors.githubHandle ? "githubHandle-error" : undefined}
              className={`${styles.input} ${errors.githubHandle ? styles.hasError : ""}`}
              {...register("githubHandle", {
                onChange: () => onFieldChange("githubHandle"),
              })}
            />
            {errors.githubHandle && (
              <p id="githubHandle-error" className={styles.errorText} role="alert">
                {errors.githubHandle.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="discordHandle" className={styles.label}>
              {isAr ? "اسم الحساب على Discord" : "Discord Handle"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="discordHandle"
              type="text"
              placeholder={isAr ? "username (اسم المستخدم)" : "username"}
              aria-invalid={Boolean(errors.discordHandle)}
              aria-describedby={errors.discordHandle ? "discordHandle-error" : undefined}
              className={`${styles.input} ${errors.discordHandle ? styles.hasError : ""}`}
              {...register("discordHandle", {
                onChange: () => onFieldChange("discordHandle"),
              })}
            />
            {errors.discordHandle && (
              <p id="discordHandle-error" className={styles.errorText} role="alert">
                {errors.discordHandle.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 2: Technical Background */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>2</span>
          <span>{isAr ? "الخلفية التقنية والتعليمية" : "Technical Background"}</span>
        </legend>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="currentStatus" className={styles.label}>
              {isAr ? "وضعك الحالي" : "Current Status"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <select
              id="currentStatus"
              aria-invalid={Boolean(errors.currentStatus)}
              aria-describedby={errors.currentStatus ? "currentStatus-error" : undefined}
              className={`${styles.select} ${errors.currentStatus ? styles.hasError : ""}`}
              {...register("currentStatus", {
                onChange: () => onFieldChange("currentStatus"),
              })}
            >
              <option value="">
                {isAr ? "-- اختر وضعك الحالي --" : "-- Select status --"}
              </option>
              <option value="student">{isAr ? "طالب" : "Student"}</option>
              <option value="graduate">{isAr ? "خريج" : "Graduate"}</option>
              <option value="working_in_tech">
                {isAr ? "أعمل في مجال التقنية" : "Working in tech"}
              </option>
              <option value="switching_career">
                {isAr ? "أغيّر مساري المهني" : "Switching career"}
              </option>
              <option value="other">{isAr ? "أخرى" : "Other"}</option>
            </select>
            {errors.currentStatus && (
              <p id="currentStatus-error" className={styles.errorText} role="alert">
                {errors.currentStatus.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="gitExperience" className={styles.label}>
              {isAr ? "استخدمت Git قبل كده؟" : "Git Experience"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <select
              id="gitExperience"
              aria-invalid={Boolean(errors.gitExperience)}
              aria-describedby={errors.gitExperience ? "gitExperience-error" : undefined}
              className={`${styles.select} ${errors.gitExperience ? styles.hasError : ""}`}
              {...register("gitExperience", {
                onChange: () => onFieldChange("gitExperience"),
              })}
            >
              <option value="">
                {isAr ? "-- اختر مستوى معرفتك بـ Git --" : "-- Select experience --"}
              </option>
              <option value="never">{isAr ? "لم أستخدمه من قبل" : "Never"}</option>
              <option value="basics_only">{isAr ? "أساسيات فقط" : "Basics only"}</option>
              <option value="comfortable">
                {isAr ? "متمكن ومرتاح معاه" : "Comfortable"}
              </option>
            </select>
            {errors.gitExperience && (
              <p id="gitExperience-error" className={styles.errorText} role="alert">
                {errors.gitExperience.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="collegeMajor" className={styles.label}>
              {isAr ? "الكلية والتخصص" : "College & Major"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="collegeMajor"
              type="text"
              placeholder={isAr ? "مثال: حاسبات ومعلومات" : "e.g. Computer Science"}
              aria-invalid={Boolean(errors.collegeMajor)}
              aria-describedby={errors.collegeMajor ? "collegeMajor-error" : undefined}
              className={`${styles.input} ${errors.collegeMajor ? styles.hasError : ""}`}
              {...register("collegeMajor", {
                onChange: () => onFieldChange("collegeMajor"),
              })}
            />
            {errors.collegeMajor && (
              <p id="collegeMajor-error" className={styles.errorText} role="alert">
                {errors.collegeMajor.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="programmingExperience" className={styles.label}>
              {isAr ? "من إمتى وانت بتتعلم برمجة؟" : "Programming Experience"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="programmingExperience"
              type="text"
              placeholder={isAr ? "مثال: سنة، ٦ شهور" : "e.g. 1 year, 6 months"}
              aria-invalid={Boolean(errors.programmingExperience)}
              aria-describedby={
                errors.programmingExperience ? "programmingExperience-error" : undefined
              }
              className={`${styles.input} ${errors.programmingExperience ? styles.hasError : ""}`}
              {...register("programmingExperience", {
                onChange: () => onFieldChange("programmingExperience"),
              })}
            />
            {errors.programmingExperience && (
              <p
                id="programmingExperience-error"
                className={styles.errorText}
                role="alert"
              >
                {errors.programmingExperience.message}
              </p>
            )}
          </div>

          {/* Technologies as Interactive Tags */}
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="technologies" className={styles.label}>
              {isAr ? "اللغات والتقنيات اللي اشتغلت بيها فعليًا" : "Technologies Used"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <span className={styles.hint}>
              {isAr
                ? "اكتب اسم التقنية واضغط Enter أو زر الإضافة (مثل: TypeScript, React, Node.js)"
                : "Type a technology and press Enter or click Add (e.g. TypeScript, React, Node.js)"}
            </span>

            <div className={styles.tagsContainer}>
              <div className={styles.tagInputWrapper}>
                <input
                  id="technologies"
                  name="technologies"
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    if (errors.technologies) clearErrors("technologies");
                  }}
                  onKeyDown={handleTagKeyDown}
                  placeholder={
                    technologies.length === 0
                      ? isAr
                        ? "اكتب تقنية واضغط Enter..."
                        : "Type tech and press Enter..."
                      : ""
                  }
                  className={`${styles.input} ${styles.tagInput} ${errors.technologies ? styles.hasError : ""}`}
                  aria-invalid={Boolean(errors.technologies)}
                  aria-describedby={
                    errors.technologies ? "technologies-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => addTag()}
                  className={styles.addTagButton}
                >
                  {isAr ? "+ إضافة" : "+ Add"}
                </button>
              </div>

              <div className={styles.tagList}>
                {technologies.length === 0 ? (
                  <span className={styles.emptyTagsHint}>
                    {isAr ? "لم تتم إضافة أي تقنيات بعد" : "No technologies added yet"}
                  </span>
                ) : (
                  technologies.map((tech, idx) => (
                    <span key={idx} className={styles.tagChip}>
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className={styles.tagRemoveBtn}
                        aria-label={isAr ? `حذف ${tech}` : `Remove ${tech}`}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {errors.technologies && (
              <p id="technologies-error" className={styles.errorText} role="alert">
                {errors.technologies.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 3: Personal Page Task */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>3</span>
          <span>{isAr ? "مهمة الصفحة الشخصية" : "Personal Page Task"}</span>
        </legend>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="personalPageUrl" className={styles.label}>
              {isAr ? "رابط الصفحة الشخصية المنشورة" : "Published Personal Page Link"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="personalPageUrl"
              type="url"
              placeholder="https://..."
              aria-invalid={Boolean(errors.personalPageUrl)}
              aria-describedby={
                errors.personalPageUrl ? "personalPageUrl-error" : undefined
              }
              className={`${styles.input} ${errors.personalPageUrl ? styles.hasError : ""}`}
              {...register("personalPageUrl", {
                onChange: () => onFieldChange("personalPageUrl"),
              })}
            />
            {errors.personalPageUrl && (
              <p id="personalPageUrl-error" className={styles.errorText} role="alert">
                {errors.personalPageUrl.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubRepoUrl" className={styles.label}>
              {isAr ? "لينك الريبو على GitHub" : "GitHub Repository Link"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="githubRepoUrl"
              type="url"
              placeholder="https://github.com/username/repository"
              aria-invalid={Boolean(errors.githubRepoUrl)}
              aria-describedby={errors.githubRepoUrl ? "githubRepoUrl-error" : undefined}
              className={`${styles.input} ${errors.githubRepoUrl ? styles.hasError : ""}`}
              {...register("githubRepoUrl", {
                onChange: () => onFieldChange("githubRepoUrl"),
              })}
            />
            {errors.githubRepoUrl && (
              <p id="githubRepoUrl-error" className={styles.errorText} role="alert">
                {errors.githubRepoUrl.message}
              </p>
            )}
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="aiUsage" className={styles.label}>
              {isAr ? "استخدمت أدوات الذكاء الاصطناعي في عمل الصفحة؟" : "AI Usage"}{" "}
              <span className={styles.required}>*</span>
            </label>
            <textarea
              id="aiUsage"
              placeholder={
                isAr
                  ? "وضح بصراحة إزاي استخدمت أدوات الذكاء الاصطناعي في بناء الصفحة الشخصية، أو اكتب أنك لم تستخدمها."
                  : "Tell us honestly how you used AI tools to build your page, or state that you didn't."
              }
              aria-invalid={Boolean(errors.aiUsage)}
              aria-describedby={errors.aiUsage ? "aiUsage-error" : undefined}
              className={`${styles.textarea} ${errors.aiUsage ? styles.hasError : ""}`}
              rows={3}
              {...register("aiUsage", { onChange: () => onFieldChange("aiUsage") })}
            />
            {errors.aiUsage && (
              <p id="aiUsage-error" className={styles.errorText} role="alert">
                {errors.aiUsage.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 4: Motivation */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>4</span>
          <span>{isAr ? "الدافع والالتزام" : "Motivation"}</span>
        </legend>
        <div className={styles.field}>
          <label htmlFor="motivation" className={styles.label}>
            {isAr ? "ليه عايز تدخل البرنامج ده تحديدًا؟" : "Motivation"}{" "}
            <span className={styles.required}>*</span>
          </label>
          <textarea
            id="motivation"
            placeholder={
              isAr
                ? "اكتب دافعك والتزامك بالورشة بالتفصيل (على الأقل ٥٠ حرف)..."
                : "Write why you want to join and your commitment to the 8 weeks (at least 50 characters)..."
            }
            aria-invalid={Boolean(errors.motivation)}
            aria-describedby={errors.motivation ? "motivation-error" : undefined}
            className={`${styles.textarea} ${errors.motivation ? styles.hasError : ""}`}
            rows={4}
            {...register("motivation", { onChange: () => onFieldChange("motivation") })}
          />
          <div className={styles.charCountRow}>
            <span
              className={`${styles.charCount} ${isMotivationValid ? styles.charCountValid : ""}`}
            >
              {isAr
                ? `${motivationText.length} / ٥٠ حرف كحد أدنى`
                : `${motivationText.length} / 50 characters min`}
            </span>
          </div>
          {errors.motivation && (
            <p id="motivation-error" className={styles.errorText} role="alert">
              {errors.motivation.message}
            </p>
          )}
        </div>
      </fieldset>

      <div className={styles.submitSection}>
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? (isAr ? "جاري إرسال الطلب..." : "Submitting...") : copy.submit}
        </button>
      </div>
    </form>
  );
}
