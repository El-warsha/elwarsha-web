import type { ApplyCohortInput } from "@core/api";

export type FieldKey = keyof ApplyCohortInput;

export type ValidationErrors = Partial<Record<FieldKey, string>>;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_WHATSAPP = /^\+?\d{10,15}$/;
const RE_GITHUB_HANDLE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})$/;
const RE_GITHUB_REPO = /^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+\/?$/i;
const RE_URL = /^https?:\/\/.+/i;

type Rule = {
  ar: string;
  en: string;
  test: (value: string) => boolean;
};

const required = (ar: string, en: string): Rule => ({
  ar,
  en,
  test: (v) => v.trim().length > 0,
});

export const FIELD_RULES: Record<FieldKey, Rule[]> = {
  fullName: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "الاسم يجب أن يكون ٣ أحرف على الأقل",
      en: "Must be at least 3 letters",
      test: (v) => v.trim().length >= 3,
    },
  ],
  email: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "البريد الإلكتروني غير صالح",
      en: "Must be a valid email address",
      test: (v) => RE_EMAIL.test(v.trim()),
    },
  ],
  whatsappNumber: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "رقم الواتساب يجب أن يكون ١٠ إلى ١٥ رقمًا (يمكن أن يبدأ بـ +)",
      en: "Must be 10 to 15 digits, optionally starting with +",
      test: (v) => RE_WHATSAPP.test(v.trim()),
    },
  ],
  githubHandle: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "اسم مستخدم GitHub غير صالح",
      en: "Must be a valid GitHub username (alphanumeric and hyphens, no URL/@)",
      test: (v) => RE_GITHUB_HANDLE.test(v.trim()),
    },
  ],
  discordHandle: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "اسم Discord يجب أن يكون حرفين على الأقل",
      en: "Must be a valid Discord handle",
      test: (v) => v.trim().length >= 2,
    },
  ],
  currentStatus: [required("هذا الحقل مطلوب", "This field is required")],
  collegeMajor: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "يجب أن يكون حرفين على الأقل",
      en: "Must be at least 2 characters",
      test: (v) => v.trim().length >= 2,
    },
  ],
  programmingExperience: [required("هذا الحقل مطلوب", "This field is required")],
  technologies: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "يجب أن يكون حرفين على الأقل",
      en: "Must be at least 2 characters",
      test: (v) => v.trim().length >= 2,
    },
  ],
  gitExperience: [required("هذا الحقل مطلوب", "This field is required")],
  personalPageUrl: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "يجب أن يبدأ بـ http:// أو https://",
      en: "Must start with http:// or https://",
      test: (v) => RE_URL.test(v.trim()),
    },
  ],
  githubRepoUrl: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "يجب أن يكون رابط مستودع GitHub صالح",
      en: "Must be a GitHub repository URL (e.g. https://github.com/u/r)",
      test: (v) => RE_GITHUB_REPO.test(v.trim()),
    },
  ],
  aiUsage: [required("هذا الحقل مطلوب", "This field is required")],
  motivation: [
    required("هذا الحقل مطلوب", "This field is required"),
    {
      ar: "يجب أن يكون ٥٠ حرفًا على الأقل",
      en: "Must be at least 50 characters",
      test: (v) => v.trim().length >= 50,
    },
  ],
};

export function validateField(
  key: FieldKey,
  value: string,
  locale: "ar" | "en",
): string | undefined {
  const rules = FIELD_RULES[key];
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule[locale];
    }
  }
  return undefined;
}

export function validateAll(
  values: ApplyCohortInput,
  locale: "ar" | "en",
): ValidationErrors {
  const out: ValidationErrors = {};
  for (const key of Object.keys(FIELD_RULES) as FieldKey[]) {
    const reason = validateField(key, values[key], locale);
    if (reason) out[key] = reason;
  }
  return out;
}
