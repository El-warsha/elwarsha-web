import type { Label } from "@entities/assignment";
import { messages, type Locale } from "@core/i18n";

import styles from "./LabelPicker.module.css";

type LabelPickerProps = {
  labels: Label[];
  selectedId: string | null;
  onSelect: (labelId: string | null) => void;
  locale: Locale;
};

export function LabelPicker({ labels, selectedId, onSelect, locale }: LabelPickerProps) {
  const copy = messages[locale].portal;

  return (
    <div role="group" aria-label={copy.labelFilterGroup} className={styles.group}>
      <button
        type="button"
        className={styles.option}
        aria-pressed={selectedId === null}
        onClick={() => onSelect(null)}
      >
        {copy.labelFilterAll}
      </button>
      {labels.map((label) => (
        <button
          key={label.id}
          type="button"
          className={styles.option}
          aria-pressed={selectedId === label.id}
          onClick={() => onSelect(label.id)}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
