import React from "react";
import type { Label } from "@entities/assignment";

type LabelPickerProps = {
  labels: Label[];
  selectedLabelId?: string;
  onSelectLabel: (labelId: string | undefined) => void;
};

export function LabelPicker({ labels, selectedLabelId, onSelectLabel }: LabelPickerProps) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <button
        aria-label="Filter by all labels"
        onClick={() => onSelectLabel(undefined)}
        style={{
          padding: "4px 12px",
          fontSize: "14px",
          borderRadius: "4px",
          background: !selectedLabelId ? "#333" : "#eee",
          color: !selectedLabelId ? "#fff" : "#333",
          border: "none",
          cursor: "pointer"
        }}
      >
        All
      </button>
      {labels.map((label) => (
        <button
          key={label.id}
          aria-label={`Filter by label ${label.name}`}
          onClick={() => onSelectLabel(label.id)}
          style={{
            padding: "4px 12px",
            fontSize: "14px",
            borderRadius: "4px",
            backgroundColor: label.color,
            color: "#fff",
            border: selectedLabelId === label.id ? "2px solid #000" : "none",
            cursor: "pointer"
          }}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}