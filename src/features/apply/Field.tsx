import styles from "./CohortApplicationForm.module.css";

type FieldProps = {
  text: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  error?: string;
  onChange?: () => void;
};

export function Field({
  text,
  type = "text",
  name,
  placeholder,
  required = false,
  minLength,
  className,
  error,
  onChange,
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {text}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className={className ?? styles.input}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      />

      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}