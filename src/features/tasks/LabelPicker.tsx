import type { Label } from "@entities/assignment";
import { messages, type Locale } from "@core/i18n";

type LabelPickerProps = {
  labels: Label[];
  selectedLabelId: string | null;
  onSelect: (labelId: string | null) => void;
  locale: Locale;
};

export function LabelPicker({
  labels,
  selectedLabelId,
  onSelect,
  locale,
}: LabelPickerProps) {
  const copy = messages[locale];

  return (
    <div>
      <label htmlFor="assignment-label-filter">{copy.portal.labels}</label>

      <select
        id="assignment-label-filter"
        value={selectedLabelId ?? ""}
        onChange={(event) => onSelect(event.target.value || null)}
      >
        <option value="">{copy.portal.allLabels}</option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </select>
    </div>
  );
}
