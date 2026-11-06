import React from "react";
export interface Label {
  id: string;
  name: string;
  color?: string;
}
interface LabelChipProps {
  label: Label;
  onRemove?: () => void;
}

export const LabelChip: React.FC<LabelChipProps> = ({ label, onRemove }) => {
  const { name, color } = label;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 500,
        backgroundColor: color || "var(--color-surface-muted)",
        color: "var(--color-text-primary)",
        border: "1px solid var(--line)",
      }}
    >
      {name}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove label ${name}`}
          style={{
            marginLeft: "6px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
          }}
        >
          &times;
        </button>
      )}
    </span>
  );
};
