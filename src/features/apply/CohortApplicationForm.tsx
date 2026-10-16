
import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";
import { Button } from "@ui/components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { api, ElWarshaApiError } from "@core/api";
import { useRef, useState } from "react";

export type CohortApplicationFormProps = {
  locale: Locale;
  cohortSlug?: string;
};

type TFormValues = {
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

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const copy = messages[locale].apply;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const successMessageRef = useRef<HTMLParagraphElement>(null);


  const { register, handleSubmit, reset,setFocus ,
    formState: { errors }
  } = useForm<TFormValues>({
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError:true
  })

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.applyCohort(_cohortSlug, data);

      console.log("Application Response:", response);

      setSuccessMessage("Your application has been submitted successfully!");
      reset();
      setTimeout(() => {
        successMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      console.error("Failed to submit application:", error);

      if (error instanceof ElWarshaApiError) {
        if (error.status === 409) {
          setErrorMessage(
            "An application with this email or GitHub handle already exists.",
          );

          setFocus('email')
        } else if (error.status === 422) {
          setErrorMessage(
            "Some fields contain invalid values. Please review your information and try again.",
          );
        } else {
          setErrorMessage(
            "Something went wrong while submitting your application. Please try again.",
          );
        }
      } else {
        setErrorMessage(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      }
    }
  };


  return (<>
    {successMessage && (
        <p className={styles.successMessage} ref={successMessageRef} role="status">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      
      <section className={styles.formSection}>
        <div className={styles.headings}>
          <h4>{copy.form.sections.personalInformation}</h4>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="fullName">
              {copy.form.fields.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={copy.form.placeholders.fullName}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
                pattern: {
                  value: /^[A-Za-z\u0600-\u06FF]+(?:\s+[A-Za-z\u0600-\u06FF]+)*$/,
                  message:
                    "Full name must contain only Arabic or English letters separated by spaces",
                },
              })}
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName ? "fullName-error" : undefined
              }
            />

            {errors.fullName && (
              <p id="fullName-error" aria-live="polite" className={styles.errorMessage}>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              {copy.form.fields.emailAddress}
            </label>
            <input
              id="email"
              type="email"
              placeholder={copy.form.placeholders.emailAddress}
              {...register('email', {
                required: 'Email is required', pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                }
              })}
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
            />

            {errors.email && (
              <p id="email-error" aria-live="polite" className={styles.errorMessage}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="whatsappNumber">
              {copy.form.fields.whatsappNumber}
            </label>
            <input
              id="whatsappNumber"
              type="tel"
              placeholder={copy.form.placeholders.whatsappNumber}
              {...register('whatsappNumber', {
                required: 'WhatsappNumber is required',
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "WhatsApp number must contain 10 to 15 digits, with an optional + prefix"
                }
              })}
              aria-invalid={!!errors.whatsappNumber}
              aria-describedby={
                errors.whatsappNumber ? "whatsappNumber-error" : undefined
              }
            />

            {errors.whatsappNumber && (
              <p id="whatsappNumber-error" aria-live="polite" className={styles.errorMessage}>
                {errors.whatsappNumber.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubHandle">
              {copy.form.fields.githubHandle}
            </label>
            <input
              id="githubHandle"
              type="text"
              placeholder={copy.form.placeholders.githubHandle}
              {...register('githubHandle', {
                required: 'GithubHandle is required',
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/,
                  message: "GitHub handle must contain only letters, numbers, and hyphens"
                }
              })}
              aria-invalid={!!errors.githubHandle}
              aria-describedby={
                errors.githubHandle ? "githubHandle-error" : undefined
              }
            />

            {errors.githubHandle && (
              <p id="githubHandle-error" aria-live="polite" className={styles.errorMessage}>
                {errors.githubHandle.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="discordHandle">
              {copy.form.fields.discordHandle}
            </label>
            <input
              id="discordHandle"
              type="text"
              placeholder={copy.form.placeholders.discordHandle}
              {...register('discordHandle', {
                required: 'DiscordHandle is required',
                validate: (value) =>
                  value.trim().length > 0 || "Discord handle is required"
              })}
              aria-invalid={!!errors.discordHandle}
              aria-describedby={
                errors.discordHandle ? "discordHandle-error" : undefined
              }
            />

            {errors.discordHandle && (
              <p id="discordHandle-error" aria-live="polite" className={styles.errorMessage}>
                {errors.discordHandle.message}
              </p>
            )}
          </div>
        </div>
      </section>


      <section className={styles.formSection}>
        <div className={styles.headings}>
          <h4>{copy.form.sections.technicalBackground}</h4>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="currentStatus">
              {copy.form.fields.currentStatus}
            </label>

            <select
              id="currentStatus"
              defaultValue=""
              {...register('currentStatus', { required: 'Current status is required' })}
              aria-invalid={!!errors.currentStatus}
              aria-describedby={
                errors.currentStatus ? "currentStatus-error" : undefined
              }
            >
              <option value="" disabled>
                {copy.form.placeholders.currentStatus}
              </option>

              <option value="student">
                {copy.form.options.currentStatus.student}
              </option>

              <option value="graduate">
                {copy.form.options.currentStatus.graduate}
              </option>

              <option value="working in tech">
                {copy.form.options.currentStatus.workingInTech}
              </option>

              <option value="switching career">
                {copy.form.options.currentStatus.switchingCareer}
              </option>

              <option value="other">
                {copy.form.options.currentStatus.other}
              </option>
            </select>
            {errors.currentStatus && (
              <p id="currentStatus-error" aria-live="polite" className={styles.errorMessage}>
                {errors.currentStatus.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="collegeMajor">
              {copy.form.fields.collegeMajor}
            </label>
            <input
              id="collegeMajor"
              type="text"
              placeholder={copy.form.placeholders.collegeMajor}
              {...register('collegeMajor', { required: 'College major is required' })}
              aria-invalid={!!errors.collegeMajor}
              aria-describedby={
                errors.collegeMajor ? "collegeMajor-error" : undefined
              }
            />

            {errors.collegeMajor && (
              <p id="collegeMajor-error" aria-live="polite" className={styles.errorMessage}>
                {errors.collegeMajor.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="programmingExperience">
              {copy.form.fields.programmingExperience}
            </label>
            <input
              id="programmingExperience"
              type="text"
              placeholder={copy.form.placeholders.programmingExperience}
              {...register('programmingExperience', { required: 'Programming experience is required' })}
              aria-invalid={!!errors.programmingExperience}
              aria-describedby={
                errors.programmingExperience ? "programmingExperience-error" : undefined
              }
            />

            {errors.programmingExperience && (
              <p id="programmingExperience-error" aria-live="polite" className={styles.errorMessage}>
                {errors.programmingExperience.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="technologies">
              {copy.form.fields.technologies}
            </label>
            <textarea
              id="technologies"
              placeholder={copy.form.placeholders.technologies}
              {...register('technologies', { required: 'Technologies is required' })}
              aria-invalid={!!errors.technologies}
              aria-describedby={
                errors.technologies ? "technologies-error" : undefined
              }
            />

            {errors.technologies && (
              <p id="technologies-error" aria-live="polite" className={styles.errorMessage}>
                {errors.technologies.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="gitExperience">
              {copy.form.fields.gitExperience}
            </label>

            <select
              id="gitExperience"
              defaultValue=""
              {...register('gitExperience', { required: 'Git experience is required' })}
              aria-invalid={!!errors.gitExperience}
              aria-describedby={
                errors.gitExperience ? "gitExperience-error" : undefined
              }
            >
              <option value="" disabled>
                {copy.form.placeholders.gitExperience}
              </option>

              <option value="never">
                {copy.form.options.gitExperience.never}
              </option>

              <option value="basics only">
                {copy.form.options.gitExperience.basicsOnly}
              </option>

              <option value="comfortable">
                {copy.form.options.gitExperience.comfortable}
              </option>
            </select>
            {errors.gitExperience && (
              <p id="gitExperience-error" aria-live="polite" className={styles.errorMessage}>
                {errors.gitExperience.message}
              </p>
            )}
          </div>
        </div>
      </section>


      <section className={styles.formSection}>
        <div className={styles.headings}>
          <h4>{copy.form.sections.personalPages}</h4>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="personalPageUrl">
              {copy.form.fields.personalPageUrl}
            </label>
            <input
              id="personalPageUrl"
              type="url"
              placeholder={copy.form.placeholders.personalPageUrl}
              {...register('personalPageUrl', {
                required: 'Personal page url is required',
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "URL must start with http:// or https://",
                }
              })}
              aria-invalid={!!errors.personalPageUrl}
              aria-describedby={
                errors.personalPageUrl ? "personalPageUrl-error" : undefined
              }
            />

            {errors.personalPageUrl && (
              <p id="personalPageUrl-error" aria-live="polite" className={styles.errorMessage}>
                {errors.personalPageUrl.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="githubRepoUrl">
              {copy.form.fields.githubRepoUrl}
            </label>
            <input
              id="githubRepoUrl"
              type="url"
              placeholder={copy.form.placeholders.githubRepoUrl}
              {...register('githubRepoUrl', {
                required: 'Github repo url is required',
                pattern: {
                  value: /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/,
                  message: "Must be a valid GitHub Repository URL"
                }
              })}
              aria-invalid={!!errors.githubRepoUrl}
              aria-describedby={
                errors.githubRepoUrl ? "githubRepoUrl-error" : undefined
              }
            />

            {errors.githubRepoUrl && (
              <p id="githubRepoUrl-error" aria-live="polite" className={styles.errorMessage}>
                {errors.githubRepoUrl.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="aiUsage">
              {copy.form.fields.aiUsage}
            </label>
            <textarea
              id="aiUsage"
              placeholder={copy.form.placeholders.aiUsage}
              {...register('aiUsage', { required: 'Ai usage is required' })}
              aria-invalid={!!errors.aiUsage}
              aria-describedby={
                errors.aiUsage ? "aiUsage-error" : undefined
              }
            />

            {errors.aiUsage && (
              <p id="aiUsage-error" aria-live="polite" className={styles.errorMessage}>
                {errors.aiUsage.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.headings}>
          <h4>{copy.form.sections.motivation}</h4>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="motivation">
              {copy.form.fields.motivation}
            </label>
            <textarea
              id="motivation"
              placeholder={copy.form.placeholders.motivation}
              {...register('motivation', {
                required: 'Motivation is required',
                minLength: {
                  value: 50,
                  message: "Motivation must be at least 50 characters",
                },
              })}
              aria-invalid={!!errors.motivation}
              aria-describedby={
                errors.motivation ? "motivation-error" : undefined
              }
            />

            {errors.motivation && (
              <p id="motivation-error" aria-live="polite" className={styles.errorMessage}>
                {errors.motivation.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <Button type="submit" className={styles.submitButton}>
        {copy.submit}
      </Button>
    </form ></>
  );
}

