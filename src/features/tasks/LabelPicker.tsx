import React from "react";

import { Label } from "./LabelChip";

interface LabelPickerProps {
  labels: Label[];
  selectedLabelId?: string;
  onSelectLabel: (labelId: string | undefined) => void;
}
export const LabelPicker: React.FC<LabelPickerProps> = ({
  labels,
  selectedLabelId,
  onSelectLabel,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <label
        htmlFor="label-filter-select"
        style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}
      >
        Filter by Label:
      </label>
      <select
        id="label-filter-select"
        aria-label="Filter tasks by label"
        value={selectedLabelId || ""}
        onChange={(e) => onSelectLabel(e.target.value ? e.target.value : undefined)}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: "var(--color-surface-muted)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--line)",
          fontSize: "14px",
          outline: "none",
        }}
      >
        <option value="">All Labels</option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </select>
    </div>
  );
};
