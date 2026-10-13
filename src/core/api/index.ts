import { createElWarshaClient } from "@elwarsha/api-client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
if (!baseUrl && import.meta.env.PROD) {
  throw new Error("VITE_API_BASE_URL is required in production");
}

export const api = createElWarshaClient({
  baseUrl: baseUrl ?? "http://localhost:3001",
});
export { ElWarshaApiError } from "@elwarsha/api-client";

(api as any).applyCohort = async (cohortSlug: string, formData: any) => {
  const response = await fetch(`${baseUrl ?? "http://localhost:3001"}/api/v1/cohorts/${cohortSlug}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, ...data };
  }

  return data;
};
