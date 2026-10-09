import { useState } from "react";
import type { Label } from "@entities/assignment";
import { LabelChip } from "./LabelChip";
import styles from "./TasksPage.module.css";

type LabelPickerProps = {
  labels: Label[];
  onChange: (labelId: string | null) => void;
};

export function LabelPicker({ labels, onChange }: LabelPickerProps) {
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setSelectedLabelId(id);
    onChange(id);
  };

  return (
    <div className={styles.filterContainer}>
      <button
        type="button"
        className={`${styles.filterButton} ${
          selectedLabelId === null ? styles.filterButtonActive : ""
        }`}
        onClick={() => handleSelect(null)}
      >
        All
      </button>

      {labels.map((label) => {
        const isSelected = selectedLabelId === label.id;
        return (
          <button
            key={label.id}
            type="button"
            className={`${styles.filterButton} ${
              isSelected ? styles.filterButtonActive : ""
            }`}
            onClick={() => handleSelect(label.id)}
          >
            {label.name}
          </button>
        );
      })}
    </div>
  );
}