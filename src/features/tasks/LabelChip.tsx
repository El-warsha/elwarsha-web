import styles from "./LabelChip.module.css";

export function LabelChip({ name }: { name: string }) {
  return <span className={styles.chip}>{name}</span>;
}