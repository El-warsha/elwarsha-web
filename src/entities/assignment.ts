import type { Assignment as AssignmentDto } from "@elwarsha/api-client";

export type Assignment = {
  id: string;
  weekNumber: number;
  title: string;
  status: "draft" | "published" | "closed";
  engagementId: string;
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
}

export const mapAssignmentDtoEntity = (assignment: AssignmentDto): Assignment => {
  return {
    id: assignment.id,
    weekNumber: assignment.weekNumber,
    title: assignment.title,
    status: assignment.status,
    engagementId: assignment.engagementId,
    labels: assignment.labels
  };
};
