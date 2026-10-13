import { z } from "zod";
import { messages } from "../../../core/i18n/locales";
import type { Locale } from "@elwarsha/api-client";

export const applyFormSchema = (locale: Locale) => {
  const validation = messages[locale].apply.applicationForm.validation;
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(1, validation.nameRequired)
.regex(/^[\p{L}]+(?:\s[\p{L}]+)*$/u, {
  error: validation.nameLetters,
})
      .refine((value) => value.replace(/\s/g, "").length >= 3, validation.nameMin),
    email: z
      .string()
      .trim()
      .min(1, validation.emailRequired)
      .pipe(z.email({ error: validation.emailInvalid })),
    whatsappNumber: z
      .string()
      .trim()
      .min(1, validation.whatsappRequired)
      .regex(/^\+?\d{10,15}$/, {
        error: validation.whatsappInvalid,
      }),
    githubHandle: z
      .string()
      .trim()
      .min(1, validation.githubRequired)
      .regex(/^[a-zA-Z0-9-]+$/, {
        error: validation.githubInvalid,
      }),
discordHandle: z
  .string()
  .trim()
  .min(1, { error: validation.discordRequired })
  .min(2, { error: validation.discordInvalid })
  .max(32, { error: validation.discordInvalid })
  .regex(/^[a-z0-9_.]+$/, {
    error: validation.discordInvalid,
  })
  .refine((value) => !value.includes(".."), {
    error: validation.discordInvalid,
  }),
    currentStatus:z.enum([
     "student",
    "graduate",
    "working_in_tech",
    "switching_career",
    "other",
  ],  {
    error: validation.statusRequired,
  },
),
collegeMajor: z
  .string()
  .trim()
  .min(1, {
    error: validation.collegeMajorRequired,
  }),
  programmingExperience: z
  .string()
  .trim()
  .min(1, {
    error: validation.programmingExperienceRequired,
  }),

  technologies: z
  .string()
  .trim()
  .min(1, {
    error: validation.technologiesRequired,
  }),
  personalPageUrl: z
  .string()
  .trim()
  .min(1, {
    error: validation.personalPageUrlRequired,
  })
  .pipe(
    z.url({
      error: validation.personalPageUrlInvalid,
    }),
  )
  .refine(
    (value) => /^https?:\/\//i.test(value),
    {
      error: validation.personalPageUrlInvalid,
    },
  ),
  githubRepoUrl: z
  .string()
  .trim()
  .min(1, {
    error: validation.githubRepoUrlRequired,
  })
  .pipe(
    z.url({
      error: validation.githubRepoUrlInvalid,
    }),
  )
  .refine(
    (value) => /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value),
    {
      error: validation.githubRepoUrlInvalid,
    },
  ),
  aiUsage: z
  .string()
  .trim()
  .min(1, {
    error: validation.aiUsageRequired,
  }),
  motivation: z
  .string()
  .trim()
  .min(50, {
    error: validation.motivationMin,
  }),


  });


};
