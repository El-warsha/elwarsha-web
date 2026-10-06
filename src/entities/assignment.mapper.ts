import type { Assignment as AssignmentDto } from "@elwarsha/api-client";

import type { Assignment as AssignmentDomain } from "./assignment";

export function mapAssignment(
  assignment: AssignmentDto,
): AssignmentDomain {
  return {
    id: assignment.id,
    weekNumber: assignment.weekNumber,
    title: assignment.title,
    status: assignment.status,
    engagementId: assignment.engagementId,
    labels: assignment.labels.map((label) => ({
      id: label.id,
      name: label.name,
    })),
  };
}