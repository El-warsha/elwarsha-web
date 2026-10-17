
import { useState } from "react";
import { api, ElWarshaApiError } from "@core/api";
import type { ApplyCohortInput } from "@entities/CohortApplication";
import type { CohortApplicationResponse } from "@elwarsha/api-client";

export function useApplyCohort() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ElWarshaApiError | Error | null>(null);
  const [data, setData] = useState<CohortApplicationResponse | null>(null);

  async function submitApplication(
    slug: string,
    application: ApplyCohortInput

  ): Promise<void> {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await api.applyCohort(slug, application);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unexpected error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    submitApplication,
    isLoading,
    error,
    data,
  };
}
