import type { Label } from "@entities/assignment";

import styles from "./LabelPicker.module.css";

export type LabelPickerProps = {
  labels: Label[];
  selectedLabelId?: string | null;
  onSelectLabel: (labelId: string | null) => void;
};

export function LabelPicker({
  labels,
  selectedLabelId = null,
  onSelectLabel,
}: LabelPickerProps) {
  return (
    <div role="group" aria-label="Filter tasks by label" className={styles.picker}>
      <button
        type="button"
        aria-label="All labels"
        aria-pressed={selectedLabelId === null}
        className={`${styles.button} ${selectedLabelId === null ? styles.buttonActive : ""}`}
        onClick={() => onSelectLabel(null)}
      >
        All
      </button>
      {labels.map((label) => {
        const isSelected = selectedLabelId === label.id;
        return (
          <button
            key={label.id}
            type="button"
            aria-label={`Filter by ${label.name}`}
            aria-pressed={isSelected}
            className={`${styles.button} ${isSelected ? styles.buttonActive : ""}`}
            onClick={() => onSelectLabel(isSelected ? null : label.id)}
          >
            {label.name}
          </button>
        );
      })}
    </div>
  );
}
