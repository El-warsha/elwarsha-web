
import type { TextareaHTMLAttributes } from "react";
import styles from "./TextAreaField.module.css";

export type TextAreaFieldProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
    containerClassName?: string;
    inputClassName?: string;
  };

export function TextAreaField({
  label,
  error,
  id,
  name,
  required,
  containerClassName,
  inputClassName,
  ...textareaProps
}: TextAreaFieldProps) {
  const textareaId = id ?? name;

  return (
    <div
      className={[styles.field, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={textareaId} className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <textarea
        {...textareaProps}
        id={textareaId}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={[
          styles.textarea,
          inputClassName,
          error ? styles.textareaError : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {error && (
        <p
          id={`${textareaId}-error`}
          className={styles.error}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
