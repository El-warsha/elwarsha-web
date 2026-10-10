import type { Label } from "@entities/label";
import styles from "./LabelChip.module.css";

type LabelChipProps = {
  label: Label;
  selected?: boolean;
  onToggle?: (labelId: string) => void;
};

export function LabelChip({ label, selected = false, onToggle }: LabelChipProps) {
  if (!onToggle) {
    return (
      <span className={styles.chip} role="status" aria-label={`Label: ${label.name}`}>
        {label.name}
      </span>
    );
  }

  const className = [styles.chip, styles.interactive, selected ? styles.selected : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-pressed={selected}
      aria-label={`Filter by label: ${label.name}`}
      onClick={() => onToggle(label.id)}
    >
      {label.name}
    </button>
  );
}
