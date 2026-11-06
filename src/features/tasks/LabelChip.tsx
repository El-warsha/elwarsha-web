import React from 'react';
// ⚠️ شرط مهم: استيراد النموذج من entities فقط واحترام الحدود الهيكلية
import type { Label } from '@entities/assignment';

interface LabelChipProps {
  label: Label;
  onRemove?: () => void;
}

export const LabelChip: React.FC<LabelChipProps> = ({ label, onRemove }) => {
  return (
    <span
      className="label-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 500,
        border: `1px solid ${label.color || '#cbd5e1'}`,
        backgroundColor: label.color ? `${label.color}15` : '#f1f5f9',
        color: label.color || '#0f172a',
      }}
    >
      {label.name}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginLeft: '0.25rem',
            lineHeight: 1,
            color: 'inherit',
          }}
          aria-label={`Remove label ${label.name}`}
        >
          &times;
        </button>
      )}
    </span>
  );
};