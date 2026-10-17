import { messages, type Locale } from "@core/i18n";
import { api, ElWarshaApiError, type ApplyCohortInput, type CohortApplicationResponse } from "@core/api";
import { useForm } from "react-hook-form";
import {useState} from "react"
import styles from "./CohortApplicationForm.module.css";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

type FormValues = ApplyCohortInput;

  export function CohortApplicationForm({
    locale,
    cohortSlug: _cohortSlug = "cohort-2",
  }: CohortApplicationFormProps) {
    const isAr = locale === "ar";
    const copy = messages[locale].apply;

    const {
      register,
      handleSubmit,
      formState: {
        errors,
        isSubmitting,
      },
    } = useForm<FormValues>({
      mode: "onBlur",
    });

      const [respond, setRespond] = useState<CohortApplicationResponse | null>(null);
      const [error, setError]=useState("")

   async function onSubmit(data: FormValues) {
  setError("");

  try {
    const result = await api.applyCohort(_cohortSlug, data);
    setRespond(result);
  } catch (error) {
    setError(
      error instanceof ElWarshaApiError
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
}
    return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Personal Information</legend>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="whatsappNumber">Whatsapp Number</label>
            <input
              type="text"
              id="whatsappNumber"
              {...register("whatsappNumber", {
                required: "Whatsapp Number is required",
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: "Whatsapp Number must contain 10 to 15 digits",
                },
              })}
            />
            {errors.whatsappNumber && (
              <p className={styles.error}>{errors.whatsappNumber.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubHandle">GitHub Handle</label>
            <input
              type="text"
              id="githubHandle"
              {...register("githubHandle", {
                required: "Github Handle is required",
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: "Github Handle must be a string",
                },
              })}
            />
            {errors.githubHandle && (
              <p className={styles.error}>{errors.githubHandle.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="discordHandle">Discord Handle</label>
            <input
              type="text"
              id="discordHandle"
              {...register("discordHandle", {
                required: "Discord Handle is required",
              })}
            />
            {errors.discordHandle && (
              <p className={styles.error}>{errors.discordHandle.message}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Technical Background</legend>
          <div className={styles.field}>
            <label htmlFor="currentStatus">Current Status</label>
            <select
              id="currentStatus"
              {...register("currentStatus", { required: "Current Status is required" })}
            >
              <option value="">Select your status</option>
              <option value="student">Student</option>
              <option value="graduate">Graduate</option>
              <option value="working in tech">working in tech</option>
              <option value="switching career">switching career</option>
              <option value="other">Other</option>
            </select>
            {errors.currentStatus && (
              <p className={styles.error}>{errors.currentStatus.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="collegeMajor">College Major</label>
            <input
              type="text"
              id="collegeMajor"
              placeholder="e.g. Computer Science"
              {...register("collegeMajor", { required: "College Major is required" })}
            />
            {errors.collegeMajor && (
              <p className={styles.error}>{errors.collegeMajor.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="programmingExperience">Programming Experience</label>
            <input
              type="text"
              id="programmingExperience"
              placeholder="e.g. 6 months or year"
              {...register("programmingExperience", {
                required: "Programming Experience is required",
              })}
            />
            {errors.programmingExperience && (
              <p className={styles.error}>{errors.programmingExperience.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="gitExperience">Git Experience</label>
            <select
              id="gitExperience"
              {...register("gitExperience", {
                required: "Git Experience is required",
              })}
            >
              <option value="">Select your experience</option>
              <option value="never">never</option>
              <option value="basics">basics only</option>
              <option value="comfortable">comfortable</option>
            </select>
            {errors.gitExperience && (
              <p className={styles.error}>{errors.gitExperience.message}</p>
            )}
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="technologies">Technologies</label>
            <textarea
              id="technologies"
              placeholder="tech you actually wrote code with"
              {...register("technologies", { required: "Technologies is required" })}
            />
            {errors.technologies && (
              <p className={styles.error}>{errors.technologies.message}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Personal Page</legend>

          <div className={styles.field}>
            <label htmlFor="personalPageUrl">Personal Page URL</label>
            <input
              type="url"
              id="personalPageUrl"
              {...register("personalPageUrl", {
                required: "Personal Page URL is required",
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: "URL must start with http:// or https://",
                },
              })}
            />
            {errors.personalPageUrl && (
              <p className={styles.error}>{errors.personalPageUrl.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubRepoUrl">GitHub Repo URL</label>
            <input
              type="url"
              id="githubRepoUrl"
              {...register("githubRepoUrl", {
                required: "Github Repo URL is required",
                pattern: {
                  value: /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/?$/,
                  message: "Enter a valid GitHub repository URL, e.g. https://github.com/u/r",
                },
              })}
            />
            {errors.githubRepoUrl && (
              <p className={styles.error}>{errors.githubRepoUrl.message}</p>
            )}
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="aiUsage">AI Usage</label>
            <textarea
              id="aiUsage"
              placeholder="tell us honestly how you used AI tools (or if you didn't)"
              {...register("aiUsage", { required: "AI Usage is required" })}
            />
            {errors.aiUsage && (
              <p className={styles.error}>{errors.aiUsage.message}</p>
            )}
          </div>
        </fieldset>

        <fieldset>  
          <legend>Motivation</legend>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="motivation">Motivation</label>
            <textarea
              id="motivation"
              {...register("motivation", {
                required: "Motivation is required",
                minLength: {
                  value: 50,
                  message: "Motivation must be at least 50 characters",
                },
              })}
            />
            {errors.motivation && (
              <p className={styles.error}>{errors.motivation.message}</p>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Submitting..." : copy.submit}
        </button>
      </form>
    );
  }
