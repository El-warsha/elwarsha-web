import type { Assignment as AssignmentDto } from "@core/api/generated";

export type Label = {
  id: string;
  name: string;
};

export type Assignment = AssignmentDto & {
  labels: Label[];
};
