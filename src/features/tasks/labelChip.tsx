import type { Assignment } from "@entities/assignment.js";
import styles from "./LabelChip.module.css";

type LabelChipProps = {
  label: Assignment["labels"][0];
};

export function LabelChip({ label }: LabelChipProps) {
  const className =
    label.name === "frontend"
      ? styles.frontend
      : label.name === "backend"
        ? styles.backend
        : styles.label;

  return (
    <span className={className}>
      {label.name}
    </span>
  );
}