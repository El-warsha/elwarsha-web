import React from 'react';
import type { Label } from '@entities/assignment';
import { LabelChip } from './LabelChip.js';

export interface LabelPickerProps {
  labels?: Label[];
  selectedLabelIds?: string[];
  onToggleLabel?: (labelId: string) => void;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
}

export const LabelPicker: React.FC<LabelPickerProps> = ({
  labels = [],
  selectedLabelIds,
  onToggleLabel,
  selectedId,
  onSelect,
}) => {
  const activeIds = selectedLabelIds ?? (selectedId ? [selectedId] : []);

  const handleClick = (labelId: string) => {
    if (onToggleLabel) {
      onToggleLabel(labelId);
    } else if (onSelect) {
      onSelect(selectedId === labelId ? null : labelId);
    }
  };

  return (
    <div
      role="group"
      aria-label="Filter tasks by label"
      className="flex flex-wrap gap-2 p-2 border rounded-md"
    >
      {labels.map((label) => {
        const isSelected = activeIds.includes(label.id);
        return (
          <button
            key={label.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => handleClick(label.id)}
            className={`transition-opacity ${
              isSelected
                ? 'opacity-100 ring-2 ring-blue-500 rounded-full'
                : 'opacity-60'
            }`}
          >
            <LabelChip label={label} />
          </button>
        );
      })}
    </div>
  );
};