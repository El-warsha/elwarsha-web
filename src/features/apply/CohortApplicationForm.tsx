import { messages, type Locale } from "@core/i18n";
import { api, ElWarshaApiError, type CohortApplicationResponse } from "@core/api";

import { useState } from "react";
import { useForm, useWatch, type Control, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, type FormValues } from "./schema";

import styles from "./CohortApplicationForm.module.css";

/* It's a separate component so only the counter re-renders while typing, not the whole form.*/
function MotivationCounter({ control }: { control: Control<FormValues> }) {
  const value = useWatch({ control, name: "motivation" }) ?? "";
  const length = value.trim().length;

  return (
    <small aria-live="polite">
      {length >= 50 ? `${length} characters ✓` : `${length} / 50 characters`}
    </small>
  );
}

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  /* Set once the backend accepts the application (201)*/
  const [receipt, setReceipt] = useState<CohortApplicationResponse | null>(null);

  /* Form setup: Zod validates the values, and errors appear once a field is touched*/
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    mode: "onTouched",
  });

  /* each input needs: registration, an id, and aria-invalid*/
  const bind = (name: keyof FormValues) => {
    const invalid = Boolean(errors[name]);
    return {
      ...register(name),
      id: name,
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${name}-error` : undefined,
    };
  };

  //*Sends the values to the backend and maps each response status*/
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      setReceipt(await api.applyCohort(cohortSlug, values));
    } catch (error) {
      // Network failures
      const apiError = error instanceof ElWarshaApiError ? error : null;
      const invalidParams = apiError?.body?.invalidParams ?? [];

      // 422: the backend rejected specific fields
      if (apiError?.status === 422 && invalidParams.length > 0) {
        invalidParams.forEach(({ name, reason }, index) => {
          if (name in Schema.shape) {
            // Only the first invalid field takes focus
            setError(
              name as keyof FormValues,
              { type: "server", message: reason },
              { shouldFocus: index === 0 },
            );
          } else {
            // Unknown field:
            setError("root.serverError", { type: "422", message: reason });
          }
        });
        return;
      }

      // 409 Conflict: duplicate application
      if (apiError?.status === 409) {
        setError("root.serverError", {
          type: "409",
          message:
            "An application with this email or GitHub handle already exists for this cohort.",
        });
        return;
      }

      // Anything else
      setError("root.serverError", {
        type: apiError ? String(apiError.status) : "network",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  /* Success state replaces the form*/
  if (receipt) {
    return (
      <div className={styles.success} dir="ltr" lang="en" role="status">
        <h2>Application received</h2>
        <p>Your Cohort 2 application has been submitted successfully.</p>
      </div>
    );
  }

  /*(Field-level backend errors clear themselves when the field is revalidated.)*/
  const dismissServerError = () => {
    if (errors.root?.serverError) clearErrors("root.serverError");
  };

  return (
    <form
      className={styles.form}
      dir="ltr"
      lang="en"
      onSubmit={handleSubmit(onSubmit)}
      onChange={dismissServerError}
      noValidate
    >
      {/* Form-level error from the backend*/}
      {errors.root?.serverError && (
        <p className={styles.serverError} role="alert">
          {errors.root.serverError.message}
        </p>
      )}

      {/* Section 1: Personal & Contact Information */}
      <fieldset>
        <legend>Personal & Contact Information</legend>

        <label htmlFor="fullName">Full Name</label>
        <input type="text" autoComplete="name" {...bind("fullName")} />
        {errors.fullName && <p role="alert">{errors.fullName.message}</p>}

        <label htmlFor="email">Email Address</label>
        <input type="email" autoComplete="email" {...bind("email")} />
        {errors.email && <p role="alert">{errors.email.message}</p>}

        <label htmlFor="whatsappNumber">WhatsApp Number</label>
        <input
          type="tel"
          autoComplete="tel"
          placeholder="+201012345678"
          {...bind("whatsappNumber")}
        />
        {errors.whatsappNumber && <p role="alert">{errors.whatsappNumber.message}</p>}

        <label htmlFor="githubHandle">GitHub Handle</label>
        <input type="text" placeholder="octocat" {...bind("githubHandle")} />
        {errors.githubHandle && <p role="alert">{errors.githubHandle.message}</p>}

        <label htmlFor="discordHandle">Discord Handle</label>
        <input type="text" {...bind("discordHandle")} />
        {errors.discordHandle && <p role="alert">{errors.discordHandle.message}</p>}
      </fieldset>

      {/* Section 2: Technical Background */}
      <fieldset>
        <legend>Technical Background</legend>

        <label htmlFor="currentStatus">Current Status</label>
        <select {...bind("currentStatus")}>
          <option value="">Choose…</option>
          <option value="student">Student</option>
          <option value="recent_graduate">Graduate</option>
          <option value="employed_tech">Working in tech</option>
          <option value="career_switcher">Switching career</option>
          <option value="other">Other</option>
        </select>
        {errors.currentStatus && <p role="alert">{errors.currentStatus.message}</p>}

        <label htmlFor="collegeMajor">College & Major</label>
        <input type="text" placeholder="Computer Science" {...bind("collegeMajor")} />
        {errors.collegeMajor && <p role="alert">{errors.collegeMajor.message}</p>}

        <label htmlFor="programmingExperience">Programming Experience</label>
        <input
          type="text"
          placeholder="1 year, 6 months"
          {...bind("programmingExperience")}
        />
        {errors.programmingExperience && (
          <p role="alert">{errors.programmingExperience.message}</p>
        )}

        <label htmlFor="technologies">Technologies Used</label>
        <textarea
          rows={4}
          placeholder="Languages and tools you actually wrote code with"
          {...bind("technologies")}
        />
        {errors.technologies && <p role="alert">{errors.technologies.message}</p>}

        <label htmlFor="gitExperience">Git Experience</label>
        <select {...bind("gitExperience")}>
          <option value="">Choose…</option>
          <option value="none">Never</option>
          <option value="basics">Basics only</option>
          <option value="comfortable">Comfortable</option>
        </select>
        {errors.gitExperience && <p role="alert">{errors.gitExperience.message}</p>}
      </fieldset>

      {/* Section 3: Personal Page Task */}
      <fieldset>
        <legend>Personal Page Task</legend>

        <label htmlFor="personalPageUrl">Published Personal Page Link</label>
        <input
          type="url"
          placeholder="https://username.github.io"
          {...bind("personalPageUrl")}
        />
        {errors.personalPageUrl && <p role="alert">{errors.personalPageUrl.message}</p>}

        <label htmlFor="githubRepoUrl">GitHub Repository Link</label>
        <input
          type="url"
          placeholder="https://github.com/user/repo"
          {...bind("githubRepoUrl")}
        />
        {errors.githubRepoUrl && <p role="alert">{errors.githubRepoUrl.message}</p>}

        <label htmlFor="aiUsage">AI Usage</label>
        <textarea
          rows={4}
          placeholder="Tell us honestly how you used AI tools (or if you didn't)"
          {...bind("aiUsage")}
        />
        {errors.aiUsage && <p role="alert">{errors.aiUsage.message}</p>}
      </fieldset>

      {/* Section 4: Motivation (with live character counter) */}
      <fieldset>
        <legend>Motivation</legend>

        <label htmlFor="motivation">Motivation</label>
        <textarea
          rows={6}
          placeholder="Why do you want to join this program specifically?"
          {...bind("motivation")}
        />
        <MotivationCounter control={control} />
        {errors.motivation && <p role="alert">{errors.motivation.message}</p>}
      </fieldset>
      <button type="submit" className={styles.submitButton}>
        {messages[locale].apply.submit}
      </button>
    </form>
  );
}
