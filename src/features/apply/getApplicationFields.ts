import { messages } from "@core/i18n";
import { Locale } from "@elwarsha/api-client";
import { ApplicationFormValues } from "./validation/applyFormSchema";

type ApplicationFieldName = keyof ApplicationFormValues;
export type cohortFieldsType = {
  name: ApplicationFieldName;
  type: "text" | "email" | "url" | "select" | "textarea"|'tel';
  label: string;
  required: boolean;
  placeholder?: string;
  defaultOption?: string;
  options?:Record<string,string>[]
}[];
export const getApplicationFields = (locale: Locale) => {
  const msgs = messages[locale].apply.applicationForm;
  return [
    {
      sectionNumber: 1,
      sectionTitle: msgs.sections.section1.sectionTitle,
      sectionSubtitle: msgs.sections.section1.sectionSubtitle,
      fields: [
        {
          name: "fullName",
          type: "text",
          label: msgs.fields.fullName,
          required: true,
          placeholder: msgs.fields.namePlacholder,
        },
        {
          name: "email",
          type: "email",
          label: msgs.fields.email,
          required: true,
          placeholder: msgs.fields.emailPlacholder,
        },

        {
          name: "whatsappNumber",
          type: "tel",
          label: msgs.fields.whatsappNumber,
          required: true,
          placeholder: msgs.fields.whatsPlacholder,
        },
        {
          name: "githubHandle",
          type: "text",
          label: msgs.fields.githubHandle,
          required: true,
          placeholder: msgs.fields.githubHandlePlacholder,
        },
        {
          name: "discordHandle",
          type: "text",
          label: msgs.fields.discordHandle,
          required: true,
          placeholder: msgs.fields.discordHandlePlacholder,
        },
      ] satisfies cohortFieldsType,
    },

    {
      sectionNumber: 2,
      sectionTitle: msgs.sections.section2.sectionTitle,
      sectionSubtitle: msgs.sections.section2.sectionSubtitle,
      fields: [
        {
          name: "currentStatus",
          type: "select",
          defaultOption: msgs.fields.currentStatus.defaultOption,
          label: msgs.fields.currentStatus.label,
          required: true,
          options: [
            { label: "Student", value: "student" },
            { label: "Graduate", value: "graduate" },
            { label: "Working in tech", value: "working_in_tech" },
            { label: "Switching career", value: "switching_career" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "collegeMajor",
          placeholder: msgs.fields.collegeMajorPlacholder,
          type: "text",
          label: msgs.fields.collegeMajor,
          required: true,
        },
        {
          name: "programmingExperience",
          type: "textarea",
          placeholder: msgs.fields.programmingExperiencePlacholder,
          label: msgs.fields.programmingExperience,
          required: true,
        },
        {
          name: "technologies",
          type: "textarea",
          placeholder: msgs.fields.technologiesPlacholder,
          label: msgs.fields.technologies,
          required: true,
        },
        {
          name: "gitExperience",
          defaultOption: msgs.fields.gitExperience.defaultOptions,
          type: "select",
          label: msgs.fields.gitExperience.label,
          required: true,
          options: [
            { label: "Never used Git", value: "never" },
            { label: "Basics only", value: "basics_only" },
            { label: "Comfortable", value: "comfortable" },
          ],
        },
      ] satisfies cohortFieldsType,
    },
    {
      sectionNumber: 3,
      sectionTitle: msgs.sections.section3.sectionTitle,
      sectionSubtitle: msgs.sections.section3.sectionSubtitle,
      fields: [
        {
          name: "personalPageUrl",
          type: "url",
          placeholder: msgs.fields.personalPageUrlPlacholder,
          label: msgs.fields.personalPageUrl,
          required: true,
        },
        {
          name: "githubRepoUrl",
          placeholder: msgs.fields.githubRepoUrlPlacholder,

          type: "url",
          label: msgs.fields.githubRepoUrl,
          required: true,
        },
        { name: "aiUsage", type: "textarea", label: msgs.fields.aiUsage, required: true },
      ] satisfies cohortFieldsType,
    },
    {
      sectionNumber: 4,
      sectionTitle: msgs.sections.section4.sectionTitle,
      sectionSubtitle: msgs.sections.section4.sectionSubtitle,
      fields: [
        {
          name: "motivation",
          placeholder: msgs.fields.motivationPlacholder,
          type: "textarea",
          label: msgs.fields.motivation,
          required: true,
        },
      ] satisfies cohortFieldsType,
    },
  ];
};
