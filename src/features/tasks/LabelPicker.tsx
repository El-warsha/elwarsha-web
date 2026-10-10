import type { Label } from "@entities/assignment";

import styles from "./LabelPicker.module.css";

export function LabelPicker({
  allLabel,
  labels,
  selectedId,
  onSelect,
}: {
  allLabel: string;
  labels: Label[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div role="group" className={styles.picker}>
      <button
        type="button"
        aria-pressed={selectedId === null}
        onClick={() => onSelect(null)}
      >
        {allLabel}
      </button>
      {labels.map((label) => (
        <button
          key={label.id}
          type="button"
          aria-pressed={label.id === selectedId}
          onClick={() => onSelect(label.id)}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
