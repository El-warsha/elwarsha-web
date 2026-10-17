import { createElWarshaClient } from "@elwarsha/api-client";
import { mapAssignment } from "@entities/assignment.mapper";
import { mapCohortApply } from "@entities/cohortApply.mapper";
import{ApplyCohortInput} from '../../entities/CohortApplication'


const baseUrl = import.meta.env.VITE_API_BASE_URL;
if (!baseUrl && import.meta.env.PROD) {
  throw new Error("VITE_API_BASE_URL is required in production");
}

const client = createElWarshaClient({
  baseUrl: baseUrl ?? "http://localhost:3001",
});
export const api = {
  ...client,

  // Map API assignment DTOs to provider-neutral Assignment entities
  async listAssignments() {
    const assignments = await client.listAssignments();

    return assignments.map(mapAssignment);
  },

  async applyCohort(slug:string,data:ApplyCohortInput){
    const mappedData=mapCohortApply(data);
    return await client.applyCohort(slug,mappedData);


  }
};

export { ElWarshaApiError } from "@elwarsha/api-client";
export type {
  ApplyCohortInput,
  CohortApplicationResponse,
  ApiError,
} from "@elwarsha/api-client";
