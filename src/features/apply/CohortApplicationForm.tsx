import { messages, type Locale } from "@core/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "@ui/components/Toast/Toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ApplicationFormValues,
  cohortApplicationSchema,
} from "./cohortApplication.schema";
import styles from "./CohortApplicationForm.module.css";
import { useSubmitApplication } from "./useSubmitApplication";
export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const DRAFT_KEY = `cohort-application-draft-${_cohortSlug}`;
  const copy = messages[locale].apply;

  const getInitialDraft = (): Partial<ApplicationFormValues> => {
    if (typeof window === "undefined") {
      return {};
    }
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        return JSON.parse(draft);
      }
    } catch (error) {
      console.error("Error parsing draft from localStorage:", error);
      return {};
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(cohortApplicationSchema(locale)),
    defaultValues: getInitialDraft(),
    mode: "onChange",
  });

  const [motivationLength, setMotivationLength] = useState(
    getInitialDraft().motivation?.replace(/\s/g, "").length || 0,
  );
  const { onChange: formOnChange, ...restMotivationRegister } = register("motivation");

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, DRAFT_KEY]);

  const { submit, retryCountdown, isLoading, isSuccess, globalError, setGlobalError } =
    useSubmitApplication(_cohortSlug, setError, locale);

  if (isSuccess) {
    localStorage.removeItem(DRAFT_KEY);
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>{copy.success.title}</h2>
        <p className={styles.successText}>{copy.success.body}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      {globalError && (
        <Toast
          message={globalError}
          type="error"
          onClose={() => setGlobalError(null)}
        ></Toast>
      )}
      <fieldset>
        <legend>{copy.form.sections.personal}</legend>
        <label htmlFor="full-name">
          <p>{copy.form.fields.fullName}</p>
          <input
            {...register("fullName")}
            id="full-name"
            type="text"
            aria-invalid={!!errors["fullName"]}
            aria-describedby={errors["fullName"] ? "full-name-error" : undefined}
          />
          {errors["fullName"] && (
            <span id="full-name-error">{errors["fullName"]?.message}</span>
          )}
        </label>

        <label htmlFor="email">
          <p>{copy.form.fields.email}</p>
          <input
            {...register("email")}
            id="email"
            type="email"
            aria-invalid={!!errors["email"]}
            aria-describedby={errors["email"] ? "email-error" : undefined}
          />
          {errors["email"] && <span id="email-error">{errors["email"]?.message}</span>}
        </label>

        <label htmlFor="whatsapp-number">
          <p>{copy.form.fields.whatsappNumber}</p>
          <input
            {...register("whatsappNumber")}
            id="whatsapp-number"
            type="tel"
            aria-invalid={!!errors["whatsappNumber"]}
            aria-describedby={
              errors["whatsappNumber"] ? "whatsapp-number-error" : undefined
            }
          />
          {errors["whatsappNumber"] && (
            <span id="whatsapp-number-error">{errors["whatsappNumber"]?.message}</span>
          )}
        </label>

        <label htmlFor="github-handle">
          <p>{copy.form.fields.githubHandle}</p>
          <input
            {...register("githubHandle")}
            id="github-handle"
            type="text"
            aria-invalid={!!errors["githubHandle"]}
            aria-describedby={errors["githubHandle"] ? "github-handle-error" : undefined}
          />
          {errors["githubHandle"] && (
            <span id="github-handle-error">{errors["githubHandle"]?.message}</span>
          )}
        </label>

        <label htmlFor="discord-handle">
          <p>{copy.form.fields.discordHandle}</p>
          <input
            {...register("discordHandle")}
            id="discord-handle"
            type="text"
            aria-invalid={!!errors["discordHandle"]}
            aria-describedby={
              errors["discordHandle"] ? "discord-handle-error" : undefined
            }
          />
          {errors["discordHandle"] && (
            <span id="discord-handle-error">{errors["discordHandle"]?.message}</span>
          )}
        </label>
      </fieldset>

      <fieldset>
        <legend>{copy.form.sections.technical}</legend>
        <label htmlFor="current-status">
          <p>{copy.form.fields.currentStatus.label}</p>
          <select
            aria-invalid={!!errors["currentStatus"]}
            aria-describedby={
              errors["currentStatus"] ? "current-status-error" : undefined
            }
            {...register("currentStatus")}
            id="current-status"
          >
            <option value="student">
              {copy.form.fields.currentStatus.options.student}
            </option>
            <option value="recent_graduate">
              {copy.form.fields.currentStatus.options.recent_graduate}
            </option>
            <option value="employed_tech">
              {copy.form.fields.currentStatus.options.employed_tech}
            </option>
            <option value="career_switcher">
              {copy.form.fields.currentStatus.options.career_switcher}
            </option>
            <option value="other">{copy.form.fields.currentStatus.options.other}</option>
          </select>
          {errors["currentStatus"] && (
            <span id="current-status-error">{errors["currentStatus"]?.message}</span>
          )}
        </label>

        <label htmlFor="college-major">
          <p>{copy.form.fields.collegeMajor}</p>
          <input
            {...register("collegeMajor")}
            id="college-major"
            type="text"
            aria-invalid={!!errors["collegeMajor"]}
            aria-describedby={errors["collegeMajor"] ? "college-major-error" : undefined}
          />
          {errors["collegeMajor"] && (
            <span id="college-major-error">{errors["collegeMajor"]?.message}</span>
          )}
        </label>

        <label htmlFor="programming-experience">
          <p>{copy.form.fields.programmingExperience}</p>
          <input
            {...register("programmingExperience")}
            id="programming-experience"
            type="text"
            aria-invalid={!!errors["programmingExperience"]}
            aria-describedby={
              errors["programmingExperience"] ? "programming-experience-error" : undefined
            }
          />
          {errors["programmingExperience"] && (
            <span id="programming-experience-error">
              {errors["programmingExperience"]?.message}
            </span>
          )}
        </label>

        <label htmlFor="technologies">
          <p>{copy.form.fields.technologies}</p>
          <input
            {...register("technologies")}
            id="technologies"
            type="text"
            aria-invalid={!!errors["technologies"]}
            aria-describedby={errors["technologies"] ? "technologies-error" : undefined}
          />
          {errors["technologies"] && (
            <span id="technologies-error">{errors["technologies"]?.message}</span>
          )}
        </label>

        <label htmlFor="git-experience">
          <p>{copy.form.fields.gitExperience.label}</p>
          <select
            aria-invalid={!!errors["gitExperience"]}
            aria-describedby={
              errors["gitExperience"] ? "git-experience-error" : undefined
            }
            {...register("gitExperience")}
            id="git-experience"
          >
            <option value="none">{copy.form.fields.gitExperience.options.never}</option>
            <option value="basics">
              {copy.form.fields.gitExperience.options.basics}
            </option>
            <option value="comfortable">
              {copy.form.fields.gitExperience.options.comfortable}
            </option>
          </select>
          {errors["gitExperience"] && (
            <span id="git-experience-error">{errors["gitExperience"]?.message}</span>
          )}
        </label>
      </fieldset>

      <fieldset>
        <legend>{copy.form.sections.task}</legend>
        <label htmlFor="personal-page-url">
          <p>{copy.form.fields.personalPageUrl}</p>
          <input
            {...register("personalPageUrl")}
            id="personal-page-url"
            type="url"
            aria-invalid={!!errors["personalPageUrl"]}
            aria-describedby={
              errors["personalPageUrl"] ? "personal-page-url-error" : undefined
            }
          />
          {errors["personalPageUrl"] && (
            <span id="personal-page-url-error">{errors["personalPageUrl"]?.message}</span>
          )}
        </label>

        <label htmlFor="github-repo-url">
          <p>{copy.form.fields.githubRepoUrl}</p>
          <input
            {...register("githubRepoUrl")}
            id="github-repo-url"
            type="url"
            aria-invalid={!!errors["githubRepoUrl"]}
            aria-describedby={
              errors["githubRepoUrl"] ? "github-repo-url-error" : undefined
            }
          />
          {errors["githubRepoUrl"] && (
            <span id="github-repo-url-error">{errors["githubRepoUrl"]?.message}</span>
          )}
        </label>

        <label htmlFor="ai-usage">
          <p>{copy.form.fields.aiUsage}</p>
          <input
            {...register("aiUsage")}
            id="ai-usage"
            type="text"
            aria-invalid={!!errors["aiUsage"]}
            aria-describedby={errors["aiUsage"] ? "ai-usage-error" : undefined}
          />
          {errors["aiUsage"] && (
            <span id="ai-usage-error">{errors["aiUsage"]?.message}</span>
          )}
        </label>
      </fieldset>

      <fieldset>
        <legend>{copy.form.sections.motivation}</legend>
        <label htmlFor="motivation" className={styles.textareaLabel}>
          <p>{copy.form.fields.motivation}</p>
          <textarea
            onChange={(e) => {
              formOnChange(e);
              setMotivationLength(e.target.value.replace(/\s/g, "").length);
            }}
            {...restMotivationRegister}
            id="motivation"
            rows={5}
            aria-invalid={!!errors["motivation"]}
            aria-describedby={errors["motivation"] ? "motivation-error" : undefined}
          ></textarea>
          <div className={styles.textareaFooter}>
            {errors["motivation"] && (
              <span id="motivation-error">{errors["motivation"]?.message}</span>
            )}
            <span
              className={`${styles.charCounter} ${motivationLength < 50 ? styles.charCounterError : ""}`}
            >
              {motivationLength} characters (minimum 50)
            </span>
          </div>
        </label>
      </fieldset>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || retryCountdown > 0}
      >
        {retryCountdown > 0 ? (
          <>
            {copy.retry} <span className={styles.retryCountdown}>{retryCountdown}</span>
          </>
        ) : (
          copy.submit
        )}
      </button>
    </form>
  );
}
