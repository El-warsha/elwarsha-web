import React from "react";
import type { Label } from "@entities/assignment";

export function LabelChip({ label }: { label: Label }) {
  return (
    <span 
      style={{ 
        backgroundColor: label.color, 
        padding: "2px 8px", 
        borderRadius: "4px", 
        fontSize: "12px", 
        color: "#fff",
        display: "inline-block"
      }}
    >
      {label.name}
    </span>
  );
}