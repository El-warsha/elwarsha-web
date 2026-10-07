import type { Label } from "@entities/assignment";
import styles from "./LabelChip.module.css";

type LabelChipProps = {
  label: Label;
};

export function LabelChip({ label }: LabelChipProps) {
  return <span className={styles.chip}>{label.name}</span>;
}