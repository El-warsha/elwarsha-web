import type {
  Assignment as AssignmentContract,
  Label as LabelContract,
} from "@elwarsha/api-client";

export type Label = Pick<LabelContract, "id" | "name">;

export type Assignment = Omit<AssignmentContract, "labels"> & {
  labels: Label[];
};