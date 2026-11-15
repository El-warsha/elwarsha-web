export {
  createElWarshaClient,
  ElWarshaApiError,
  type Assignment,
  type Capability,
  type ElWarshaClient,
  type Engagement,
  type Membership,
  type MembershipRole,
  type Product,
  type SessionResponse,
  type SessionUser,
  type CohortRef,
  type Week,
  type WeekResourceItem,
  type WeekResources,
  type WeekAppliedLayer,
  type WeekAssignment,
} from "@elwarsha/api-client";

export type SubmissionStatus = 'draft' | 'in_review' | 'merged';

export interface RepositorySubmissionItem {
  repositoryName: string;
  status: SubmissionStatus;
  prUrl: string | null;
  prNumber: number | null;
}

export interface AssignmentSubmissionsResponse {
  assignmentId: string;
  weekNumber: number;
  submissions: RepositorySubmissionItem[];
}
