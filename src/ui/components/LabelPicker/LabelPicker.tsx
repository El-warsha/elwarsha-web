import type { Label } from "@entities/assignment";
import styles from "./LabelPicker.module.css";

type LabelPickerProps = {
  labels: Label[];
  value: string | null;
  onChange: (labelId: string | null) => void;
};

export function LabelPicker({
  labels,
  value,
  onChange,
}: LabelPickerProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="task-label-filter">
        Filter by label
      </label>

      <select
        id="task-label-filter"
        className={styles.select}
        value={value ?? ""}
        onChange={(event) => {
          onChange(event.target.value || null);
        }}
      >
        <option value="">All labels</option>

        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </select>
    </div>
  );
}