
import type { InputHTMLAttributes } from "react";
import styles from "./TextInputField.module.css";
import type { FormFieldProps } from "src/types/types";

type TextInputFieldProps = InputHTMLAttributes<HTMLInputElement> & FormFieldProps

export function TextInputField({
  label,
  error,
  id,
  name,
  required,
  containerClassName,
  inputClassName,
  ...inputProps
}: TextInputFieldProps) {
  const inputId = id ?? name;

  return (
    <div
      className={[styles.field, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <input
        {...inputProps}
        id={inputId}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          styles.input,
          inputClassName,
          error ? styles.inputError : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className={styles.error}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
