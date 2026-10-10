import { Label } from "@entities/label";
import styles from "./LabelPicker.module.css";
import { LabelChip } from "../Label-chip/LabelChip.js";

type LabelPickerProps = {
  labels: Label[];
  selected: string[];
  onChange: (selectedIds: string[]) => void;
  legend?: string;
};

export function LabelPicker({
  labels,
  selected,
  onChange,
  legend = "Filter by labels",
}: LabelPickerProps) {
  if (labels.length === 0) return null;

  const toggle = (labelId: string) => {
    const isSelected = selected.includes(labelId);
    onChange(
      isSelected ? selected.filter((id) => id !== labelId) : [...selected, labelId],
    );
  };

  const clear = () => onChange([]);

  return (
    <fieldset className={styles.picker} aria-label={legend}>
      <legend className={styles.legend}>{legend}</legend>

      <ul className={styles.list}>
        {labels.map((label) => {
          const isSelected = selected.includes(label.id);
          return (
            <li key={label.id}>
              <LabelChip label={label} selected={isSelected} onToggle={toggle} />
            </li>
          );
        })}
      </ul>

      {selected.length > 0 ? (
        <button
          type="button"
          className={styles.clear}
          onClick={clear}
          aria-label="Clear label filters"
        >
          Clear
        </button>
      ) : null}
    </fieldset>
  );
}
