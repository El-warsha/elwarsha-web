import { useState } from "react";
import styles from "./CohortApplicationForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@core/api";

interface ICohortApplicationReceipt {
  id: string;
  cohortSlug?: string;
  email: string;
  status?: string;
  createdAt: string;
}

interface IFormInput {
  fullName: string;
  email: string;
  whatsappNumber: string;
  githubHandle: string;
  discordHandle: string;

  currentStatus: string;
  collegeMajor: string;
  programmingExperience: string;
  technologies: string;
  gitExperience: string;

  personalPageUrl: string;
  githubRepoUrl: string;
  aiUsage: string;

  motivation: string;
}

export default function CohortApplicationForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError: setFormError,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const motivationValue = watch("motivation") || "";

  const [receipt, setReceipt] = useState<ICohortApplicationReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await api.applyCohort("cohort-2", data);
      setReceipt(response);
    } catch (err: any) {
      console.error("Error submitting form:", err);

      if (err?.status === 422 && err?.invalidParams) {
        err.invalidParams.forEach((param: { name: keyof IFormInput; reason: string }) => {
          setFormError(param.name, {
            type: "server",
            message: param.reason,
          });
        });
      } else if (err?.status === 409) {
        setError(
          err?.detail ||
            "An application with this email or GitHub handle already exists for Cohort 2.",
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className={styles.receiptCard}>
        <h2 className={styles.receiptTitle}>Application Submitted Successfully 🎉</h2>
        <div className={styles.receiptDetails}>
          <p>
            <strong>Application ID:</strong> {receipt.id}
          </p>
          <p>
            <strong>Email:</strong> {receipt.email}
          </p>
          <p>
            <strong>Submitted At:</strong> {receipt.createdAt}
          </p>
        </div>
        <p style={{ marginTop: "1rem" }}>Thank you for your application!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Apply for Cohort 2</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {error && <div className={styles.alertError}>{error}</div>}

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Personal & Contact Information</legend>

          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={styles.input}
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName", {
              required: "Full name is required",
              minLength: { value: 3, message: "Full name must be at least 3 characters" },
            })}
          />
          {errors.fullName && (
            <span id="fullName-error" className={styles.errorText}>
              {errors.fullName.message}
            </span>
          )}

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Must be a valid email address",
              },
            })}
          />
          {errors.email && (
            <span id="email-error" className={styles.errorText}>
              {errors.email.message}
            </span>
          )}

          <label htmlFor="whatsappNumber" className={styles.label}>
            WhatsApp Number
          </label>
          <input
            id="whatsappNumber"
            type="tel"
            className={styles.input}
            aria-invalid={errors.whatsappNumber ? "true" : "false"}
            aria-describedby={errors.whatsappNumber ? "whatsappNumber-error" : undefined}
            {...register("whatsappNumber", {
              required: "WhatsApp number is required",
              pattern: {
                value: /^\d{10,15}$/,
                message: "WhatsApp number must be between 10 and 15 digits",
              },
            })}
          />
          {errors.whatsappNumber && (
            <span id="whatsappNumber-error" className={styles.errorText}>
              {errors.whatsappNumber.message}
            </span>
          )}

          <label htmlFor="githubHandle" className={styles.label}>
            GitHub Handle
          </label>
          <input
            id="githubHandle"
            type="text"
            className={styles.input}
            aria-invalid={errors.githubHandle ? "true" : "false"}
            aria-describedby={errors.githubHandle ? "githubHandle-error" : undefined}
            {...register("githubHandle", {
              required: "GitHub handle is required",
              pattern: {
                value: /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
                message: "Invalid GitHub username format",
              },
            })}
          />
          {errors.githubHandle && (
            <span id="githubHandle-error" className={styles.errorText}>
              {errors.githubHandle.message}
            </span>
          )}

          <label htmlFor="discordHandle" className={styles.label}>
            Discord Handle
          </label>
          <input
            id="discordHandle"
            type="text"
            className={styles.input}
            aria-invalid={errors.discordHandle ? "true" : "false"}
            aria-describedby={errors.discordHandle ? "discordHandle-error" : undefined}
            {...register("discordHandle", { required: "Discord handle is required" })}
          />
          {errors.discordHandle && (
            <span id="discordHandle-error" className={styles.errorText}>
              {errors.discordHandle.message}
            </span>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Technical Background</legend>

          <label htmlFor="currentStatus" className={styles.label}>
            Current Status
          </label>
          <select
            id="currentStatus"
            className={styles.select}
            aria-invalid={errors.currentStatus ? "true" : "false"}
            aria-describedby={errors.currentStatus ? "currentStatus-error" : undefined}
            {...register("currentStatus", { required: "Current status is required" })}
          >
            <option value="">Select an option</option>
            <option value="student">Student</option>
            <option value="graduate">Graduate</option>
            <option value="working in tech">working in tech</option>
            <option value="switching career">switching career</option>
            <option value="other">other</option>
          </select>
          {errors.currentStatus && (
            <span id="currentStatus-error" className={styles.errorText}>
              {errors.currentStatus.message}
            </span>
          )}

          <label htmlFor="collegeMajor" className={styles.label}>
            College Major
          </label>
          <input
            id="collegeMajor"
            type="text"
            className={styles.input}
            aria-invalid={errors.collegeMajor ? "true" : "false"}
            aria-describedby={errors.collegeMajor ? "collegeMajor-error" : undefined}
            {...register("collegeMajor", { required: "College major is required" })}
          />
          {errors.collegeMajor && (
            <span id="collegeMajor-error" className={styles.errorText}>
              {errors.collegeMajor.message}
            </span>
          )}

          <label htmlFor="programmingExperience" className={styles.label}>
            Programming Experience
          </label>
          <input
            id="programmingExperience"
            type="text"
            className={styles.input}
            aria-invalid={errors.programmingExperience ? "true" : "false"}
            aria-describedby={
              errors.programmingExperience ? "programmingExperience-error" : undefined
            }
            {...register("programmingExperience", {
              required: "Programming experience is required",
            })}
          />
          {errors.programmingExperience && (
            <span id="programmingExperience-error" className={styles.errorText}>
              {errors.programmingExperience.message}
            </span>
          )}

          <label htmlFor="technologies" className={styles.label}>
            Technologies
          </label>
          <textarea
            id="technologies"
            className={styles.textarea}
            aria-invalid={errors.technologies ? "true" : "false"}
            aria-describedby={errors.technologies ? "technologies-error" : undefined}
            {...register("technologies", { required: "Technologies is required" })}
          />
          {errors.technologies && (
            <span id="technologies-error" className={styles.errorText}>
              {errors.technologies.message}
            </span>
          )}

          <label htmlFor="gitExperience" className={styles.label}>
            Git Experience
          </label>
          <select
            id="gitExperience"
            className={styles.select}
            aria-invalid={errors.gitExperience ? "true" : "false"}
            aria-describedby={errors.gitExperience ? "gitExperience-error" : undefined}
            {...register("gitExperience", { required: "Git experience is required" })}
          >
            <option value="">Select an option</option>
            <option value="never">never</option>
            <option value="basics only">basics only</option>
            <option value="comfortable">comfortable</option>
          </select>
          {errors.gitExperience && (
            <span id="gitExperience-error" className={styles.errorText}>
              {errors.gitExperience.message}
            </span>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Personal Page Task</legend>

          <label htmlFor="personalPageUrl" className={styles.label}>
            Personal Page URL
          </label>
          <input
            id="personalPageUrl"
            type="url"
            className={styles.input}
            aria-invalid={errors.personalPageUrl ? "true" : "false"}
            aria-describedby={
              errors.personalPageUrl ? "personalPageUrl-error" : undefined
            }
            {...register("personalPageUrl", {
              required: "Personal page URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "URL must start with http:// or https://",
              },
            })}
          />
          {errors.personalPageUrl && (
            <span id="personalPageUrl-error" className={styles.errorText}>
              {errors.personalPageUrl.message}
            </span>
          )}

          <label htmlFor="githubRepoUrl" className={styles.label}>
            GitHub Repo URL
          </label>
          <input
            id="githubRepoUrl"
            type="url"
            className={styles.input}
            aria-invalid={errors.githubRepoUrl ? "true" : "false"}
            aria-describedby={errors.githubRepoUrl ? "githubRepoUrl-error" : undefined}
            {...register("githubRepoUrl", {
              required: "GitHub repo URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "URL must start with http:// or https://",
              },
            })}
          />
          {errors.githubRepoUrl && (
            <span id="githubRepoUrl-error" className={styles.errorText}>
              {errors.githubRepoUrl.message}
            </span>
          )}

          <label htmlFor="aiUsage" className={styles.label}>
            How you used AI tools (or if you didn't)?
          </label>
          <textarea
            id="aiUsage"
            className={styles.textarea}
            aria-invalid={errors.aiUsage ? "true" : "false"}
            aria-describedby={errors.aiUsage ? "aiUsage-error" : undefined}
            {...register("aiUsage", { required: "AI usage is required" })}
          />
          {errors.aiUsage && (
            <span id="aiUsage-error" className={styles.errorText}>
              {errors.aiUsage.message}
            </span>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Motivation</legend>

          <label htmlFor="motivation" className={styles.label}>
            Why are you interested in this cohort?
          </label>
          <textarea
            id="motivation"
            className={styles.textarea}
            aria-invalid={errors.motivation ? "true" : "false"}
            aria-describedby={errors.motivation ? "motivation-error" : undefined}
            {...register("motivation", {
              required: "Motivation is required",
              minLength: { value: 50, message: "Must be at least 50 characters" },
            })}
          />
          {errors.motivation && (
            <span id="motivation-error" className={styles.errorText}>
              {errors.motivation.message}
            </span>
          )}
          <div
            className={styles.charCounter}
            style={{
              color:
                motivationValue.length >= 50 ? "var(--color-text-success)" : "inherit",
            }}
          >
            {motivationValue.length} / 50 characters
          </div>
        </fieldset>

        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";

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
      </div>
      <button type="submit" className={styles.submitButton}>
        {copy.submit}
      </button>
    </form>
  );
}
