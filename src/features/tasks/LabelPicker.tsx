import type { Label } from "@entities/assignment";
import { messages, type Locale } from "@core/i18n";

import { LabelChip } from "./LabelChip.js";
import style from "./LabelPicker.module.css";

type LabelPickerProps = {
  labels: Label[] | null;
  selectedLabel: string | null;
  onSelect: (name: string | null) => void;
  locale: Locale;
};

export function LabelPicker({
  labels,
  selectedLabel,
  onSelect,
  locale,
}: LabelPickerProps) {
  const copy = messages[locale];

  if (labels === null) {
    return <p role="status">{copy.portal.labelsLoading}</p>;
  }

  if (labels.length === 0) {
    return <p>{copy.portal.labelsEmpty}</p>;
  }

  return (
    <div
      className={style.labelPicker}
      role="group"
      aria-label={copy.portal.labelsFilter}
    >
      <button
        className={style.labelPicker__button}
        type="button"
        aria-pressed={selectedLabel === null}
        onClick={() => onSelect(null)}
      >
        <LabelChip>All</LabelChip>
      </button>

      {labels.map((label) => (
        <button
          className={style.labelPicker__button}
          key={label.name}
          type="button"
          aria-pressed={label.name === selectedLabel}
          onClick={() => onSelect(label.name)}
        >
          <LabelChip>{label.name}</LabelChip>
        </button>
      ))}
    </div>
  );
}