
import type { Label } from "@entities/assignment";
import styles from "./LabelChip.module.css";

export function LabelChip({ label }: { label: Label }) {
  return <span className={styles.chip}>{label.name}</span>;
}