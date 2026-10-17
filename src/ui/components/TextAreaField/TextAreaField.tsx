
import type { TextareaHTMLAttributes } from "react";
import styles from "./TextAreaField.module.css";
import type { FormFieldProps } from "src/types/types";
export type TextAreaFieldProps =Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,"onChange"|'value'>
   & FormFieldProps

export function TextAreaField({
  label,
  error,
  id,
  name,
  value,
  onChange,
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
        value={value}
        onChange={(e)=>onChange(e.target.value)}
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
        >
          {error}
        </p>
      )}
    </div>
  );
}
