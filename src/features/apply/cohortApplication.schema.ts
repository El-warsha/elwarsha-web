import { messages, type Locale } from "@core/i18n";
import { z } from "zod";

export const cohortApplicationSchema = (local: Locale) => {
  const { required, email, phone, githubHandle, url, githubUrl, minLength, invalid } =
    messages[local].apply.validation;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const githubRepoRegex =
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
  const githubHandleRegex = /^[a-zA-Z0-9_-]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const requiredString = z.string().min(1, { message: required });

  return z.object({
    fullName: requiredString.min(3, { message: minLength(3) }),
    email: requiredString.regex(emailRegex, { message: email }),
    whatsappNumber: requiredString.regex(phoneRegex, { message: phone }),
    githubHandle: requiredString.regex(githubHandleRegex, { message: githubHandle }),
    discordHandle: requiredString,

    currentStatus: z.enum(
      ["student", "recent_graduate", "employed_tech", "career_switcher", "other"],
      { message: invalid },
    ),
    collegeMajor: requiredString,
    programmingExperience: requiredString,
    technologies: requiredString,
    gitExperience: z.enum(["none", "basics", "comfortable"], { message: invalid }),

    personalPageUrl: requiredString.regex(urlRegex, { message: url }),
    githubRepoUrl: requiredString.regex(githubRepoRegex, { message: githubUrl }),

    aiUsage: requiredString,
    motivation: requiredString.min(50, { message: minLength(50) }),
  });
};

export type ApplicationFormValues = z.infer<ReturnType<typeof cohortApplicationSchema>>;
