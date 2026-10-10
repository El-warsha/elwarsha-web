import type { Label } from "@entities/assignment";

import styles from "./LabelPicker.module.css";

type LabelPickerProps = {
  labels: Label[];
  selectedLabelId?: string;
  onSelectLabel: (labelId: string | undefined) => void;
};

export function LabelPicker({
  labels,
  selectedLabelId,
  onSelectLabel,
}: LabelPickerProps) {
  return (
    <div className={styles.container}>
      {labels.map((label) => (
        <button
          type="button"
          key={label.id}
          onClick={() => onSelectLabel(label.id)}
          className={`${styles.button} ${
            selectedLabelId === label.id ? styles.active : ""
          }`}
          style={
            {
              "--label-color": label.color,
            } as React.CSSProperties
          }
        >
          <span className={styles.dot} />
          {label.name}
        </button>
      ))}
    </div>
  );
}