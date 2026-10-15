
import { useState, type FormEvent } from "react";
import { api } from "@core/api";
import type { Locale } from "@core/i18n";
import {
  ElWarshaApiError,
  type ApplyCohortInput,
} from "@elwarsha/api-client";

type FormStatus = "idle" | "submitting" | "success";

type FieldError = {
  name: string;
  reason: string;
};

type ApiErrorBody = {
  detail?: string;
  title?: string;
  status?: number;
  invalidParams?: FieldError[];
};

export function useCohortApplication(cohortSlug: string, locale: "ar" | "en") {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string>
  >({});

  const isAr = locale === "ar";

  function clearFieldError(name: string) {
    setFieldErrors((previous) => {
      if (!(name in previous)) return previous;

      const next = { ...previous };
      delete next[name];
      return next;
    });

    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setSubmitError("");
    setFieldErrors({});

    try {
      const form = new FormData(event.currentTarget);

      const get = (key: string) =>
        String(form.get(key) ?? "").trim();

      const payload: ApplyCohortInput = {
        fullName: get("fullName"),
        email: get("email"),
        whatsappNumber: get("whatsappNumber"),
        githubHandle: get("githubHandle"),
        discordHandle: get("discordHandle"),
        currentStatus: get(
          "currentStatus",
        ) as ApplyCohortInput["currentStatus"],
        collegeMajor: get("collegeMajor"),
        programmingExperience: get("programmingExperience"),
        technologies: get("technologies"),
        gitExperience: get(
          "gitExperience",
        ) as ApplyCohortInput["gitExperience"],
        personalPageUrl: get("personalPageUrl"),
        githubRepoUrl: get("githubRepoUrl"),
        aiUsage: get("aiUsage"),
        motivation: get("motivation"),
      };

      await api.applyCohort(cohortSlug, payload);

      setStatus("success");
    } catch (error: unknown) {
      setStatus("idle");

      if (error instanceof ElWarshaApiError) {
        const body = error.body as ApiErrorBody | null;

        if (error.status === 422 && body?.invalidParams) {
          const errors: Record<string, string> = {};

          for (const param of body.invalidParams) {
            errors[param.name] = param.reason;
          }

          setFieldErrors(errors);
          setSubmitError("");
          return;
        }

        if (error.status === 409) {
          setSubmitError(
            isAr
              ? "يوجد طلب تقديم مسجل بالفعل باستخدام هذا البريد الإلكتروني أو اسم مستخدم GitHub."
              : body?.detail ??
                  "An application with this email or GitHub handle already exists."
          );
          return;
        }

        setSubmitError(
          body?.detail ??
            body?.title ??
            error.message ??
            "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return {
    status,
    submitError,
    fieldErrors,
    clearFieldError,
    handleSubmit,
  };
}