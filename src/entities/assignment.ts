import type { Assignment as ApiAssignment } from "@elwarsha/api-client";

export type Label = ApiAssignment["labels"];

export type Assignment = Pick<
  ApiAssignment,
  "id" | "weekNumber" | "title" | "status" | "labels"
>;