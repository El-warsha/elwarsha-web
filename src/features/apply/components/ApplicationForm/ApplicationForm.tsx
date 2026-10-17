import { Locale } from "@core/i18n";
import { getApplicationFields } from "@features/apply/getApplicationFields";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormSection from "../FormSection/FormSection";
import FormField from "@ui/components/FormField/FormField";
import { ApplicationFormValues, applyFormSchema } from "../../validation/applyFormSchema";

import styles from "./ApplicationForm.module.css";
import { useApplyCohort } from "@features/apply/hooks/useApplyCohort";
import { ElWarshaApiError } from "@elwarsha/api-client";

export default function ApplicationForm({ locale }: { locale: Locale }) {
  const defaultValues = {
    fullName: "",
    email: "",
    whatsappNumber: "",
    githubHandle: "",
    discordHandle: "",

    collegeMajor: "",
    programmingExperience: "",
    technologies: "",
    personalPageUrl: "",
    githubRepoUrl: "",
    aiUsage: "",
    motivation: "",
  };
  const { data, error, isLoading, submitApplication } = useApplyCohort();
  const formFields = getApplicationFields(locale);
  const schema = applyFormSchema(locale);
  console.log("SCHEMA TEST:", schema.safeParse(defaultValues));
  const { handleSubmit, control } = useForm<ApplicationFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: ApplicationFormValues) => {
    submitApplication("cohort-2", data);
  };

  const errorMessage =
  error instanceof ElWarshaApiError
    ? error.status === 409
      ? "You have already submitted an application."
      : error.status === 422
        ? "Please check your submitted information."
        : "Something went wrong. Please try again."
    : error
      ? "Unable to submit your application. Check your connection."
      : null;
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((section) => (
        <FormSection
          key={section.sectionNumber}
          sectionNumber={section.sectionNumber}
          sectionTitle={section.sectionTitle}
          sectionSubtitle={section.sectionSubtitle}
        >
          {section.fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: controllerField, fieldState }) => {
                return (
                  <FormField
                    {...field}
                    value={controllerField.value ?? ""}
                    onChange={controllerField.onChange}
                    error={fieldState.error?.message}
                  />
                );
              }}
            />
          ))}
        </FormSection>
      ))}
      {errorMessage && (
  <p role="alert">
    {errorMessage}
  </p>
)}

{data !== null && (
  <p role="status">
    Your application has been submitted successfully!
  </p>
)}

      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
