import { useState } from "react";
import styles from "./CohortApplicationForm.module.css";

interface TextareaFieldProps {
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  error?: string;
  onValueChange?: () => void;
}

export function TextareaField({
  id,
  name,
  placeholder,
  required = false,
  minLength,
  className,
  error,
  onValueChange,
}: TextareaFieldProps) {
  const [value, setValue] = useState("");
  const errorId = `${id}-error`;

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>{placeholder}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onValueChange?.();
        }}
        className={className ?? styles.textarea}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [
            minLength !== undefined ? `${id}-count` : undefined,
            error ? errorId : undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />

      {minLength !== undefined && (
        <span
          id={`${id}-count`}
          className={
            value.length >= minLength
              ? styles.charCountMinLength
              : styles.charCount
          }
          aria-live="polite"
        >
          {value.length} / {minLength}
        </span>
      )}

      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}