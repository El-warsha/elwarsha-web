import { useEffect, useState } from "react";
import { api, ElWarshaApiError } from "@core/api";
import { UseFormSetError } from "react-hook-form";
import { ApplicationFormValues } from "./cohortApplication.schema";
import { messages, type Locale } from "@core/i18n";

export const useSubmitApplication = (
  cohortSlug: string,
  setError: UseFormSetError<ApplicationFormValues>,
  locale: Locale,
) => {
  const copy = messages[locale].apply;

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(0);

  useEffect(() => {
    if (retryCountdown <= 0) return;

    const timer = setTimeout(() => {
      setRetryCountdown(retryCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [retryCountdown]);

  const submit = async (data: ApplicationFormValues) => {
    if (retryCountdown > 0) return;

    setIsLoading(true);
    setGlobalError(null);

    try {
      await api.applyCohort(cohortSlug, data);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ElWarshaApiError) {
        const errorBody = error.body as any;
        const apiError = errorBody?.error || errorBody;
        const status = error.status;

        if (status === 429) {
          const waitTime = 60; // mocked
          setRetryCountdown(isNaN(waitTime) ? 60 : waitTime);
          setGlobalError(copy.apiErrors.rateLimit(waitTime));
          return;
        }

        if (apiError?.invalidParams) {
          apiError.invalidParams.forEach((param: any) => {
            setError(param.name, { type: "server", message: param.reason });
          });
        } else {
          const apiMessage = Array.isArray(apiError?.message)
            ? apiError.message[0]
            : apiError?.message ||
              apiError?.detail ||
              apiError?.title ||
              copy.apiErrors.default;

          setGlobalError(apiMessage);
        }
      } else {
        setGlobalError(copy.apiErrors.unexpected);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, retryCountdown, isSuccess, isLoading, globalError, setGlobalError };
};
