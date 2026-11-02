import { useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "@core/api";
import type { ApplyCohortInput, CohortApplicationResponse } from "@core/api";
import type { Locale } from "@core/i18n";

export const initialApplicationValues: ApplyCohortInput = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  githubHandle: "",
  discordHandle: "",
  currentStatus: "student",
  collegeMajor: "",
  programmingExperience: "",
  technologies: "",
  gitExperience: "basics",
  personalPageUrl: "",
  githubRepoUrl: "",
  aiUsage: "",
  motivation: "",
};

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface UseCohortApplicationFormOptions {
  cohortSlug?: string;
  locale: Locale;
  onSuccess?: (receipt: CohortApplicationResponse) => void;
}

export function useCohortApplicationForm({
  cohortSlug = "cohort-2",
  locale,
  onSuccess,
}: UseCohortApplicationFormOptions) {
  const isAr = locale === "ar";
  const [formData, setFormData] = useState<ApplyCohortInput>(initialApplicationValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<CohortApplicationResponse | null>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev: ApplyCohortInput) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setGlobalError(null);

    try {
      const response = await api.applyCohort(cohortSlug, formData);
      setReceipt(response);
      setStatus("success");
      onSuccess?.(response);
    } catch (err: unknown) {
      console.error("CohortApplicationForm submission error:", err);
      setStatus("error");

      const apiErr = err as {
        status?: number;
        body?: {
          detail?: string;
          invalidParams?: Array<{ name: string; reason: string }>;
        };
        message?: string;
      };

      if (apiErr?.status === 422 && apiErr.body?.invalidParams) {
        const map: Record<string, string> = {};
        for (const param of apiErr.body.invalidParams) {
          map[param.name] = param.reason;
        }
        setFieldErrors(map);
        return;
      }

      if (apiErr?.status === 409) {
        setGlobalError(
          apiErr.body?.detail ??
            (isAr
              ? "تم تقديم طلب مسبقاً بهذا البريد الإلكتروني أو اسم حساب GitHub لهذه الدفعة."
              : "An application with this email or GitHub handle already exists for this cohort."),
        );
        return;
      }

      if (apiErr?.message && !apiErr.message.includes("Failed to fetch")) {
        setGlobalError(apiErr.message);
        return;
      }

      setGlobalError(
        isAr
          ? "تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الـ API على المنفذ 3001."
          : "Could not connect to the backend. Please verify the API is running on port 3001.",
      );
    }
  }

  return {
    formData,
    status,
    fieldErrors,
    globalError,
    receipt,
    isSubmitting: status === "submitting",
    isAr,
    handleChange,
    handleSubmit,
  };
}
