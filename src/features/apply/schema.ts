import { z } from "zod";

/* Validation rules for the Cohort 2 application form.
 Every text field is trimmed first, so whitespace-only input counts as empty.*/

export const Schema = z.object({
  /* ---------- Section 1: Personal & Contact Information ----------*/
  fullName: z.string().trim().min(3, "Full name must be at least 3 letters"),

  // min(1) runs first so an empty field says "required" instead of "invalid email"
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email({ error: "Enter a valid email (e.g. user@example.com)" })),

  whatsappNumber: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required")
    .regex(
      /^\+?\d{10,15}$/,
      "Enter 10 to 15 digits (supports + e.g. +201012345678 or 01012345678)",
    ),

  githubHandle: z
    .string()
    .trim()
    .min(1, "GitHub handle is required")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "Username only (e.g. octocat): letters, numbers and hyphens, no URL or @",
    ),

  discordHandle: z
    .string()
    .trim()
    .min(1, "Discord handle is required")
    .regex(/^[^\s@]+$/, "Username only: no spaces or @"),

  /* ---------- Section 2: Technical Background ----------*/
  currentStatus: z.enum(
    ["student", "recent_graduate", "employed_tech", "career_switcher", "other"],
    { error: "Choose your current status" },
  ),

  collegeMajor: z
    .string()
    .trim()
    .min(1, "College & major is required (e.g. Computer Science)"),

  programmingExperience: z
    .string()
    .trim()
    .min(1, "Programming experience is required (e.g. 1 year, 6 months)"),

  technologies: z
    .string()
    .trim()
    .min(1, "List the technologies you actually wrote code with"),

  gitExperience: z.enum(["none", "basics", "comfortable"], {
    error: "Choose your Git experience level",
  }),

  /* ---------- Section 3: Personal Page Task ----------*/
  personalPageUrl: z
    .string()
    .trim()
    .min(1, "Personal page link is required")
    .pipe(z.httpUrl({ error: "Enter a valid link starting with http:// or https://" })),

  githubRepoUrl: z
    .string()
    .trim()
    .min(1, "GitHub repository link is required")
    .regex(
      /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9._-]+\/?$/i,
      "Must be a GitHub repository URL (e.g. https://github.com/user/repo)",
    ),

  aiUsage: z.string().trim().min(1, "Tell us how you used AI tools (or that you didn't)"),

  /* ---------- Section 4: Motivation ----------*/
  motivation: z.string().trim().min(50, `Motivation must be at least 50 characters`),
});

/* Form values type, inferred from the schema*/
export type FormValues = z.infer<typeof Schema>;
