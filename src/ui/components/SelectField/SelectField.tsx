
import styles from "./SelectField.module.css";

interface SelectFieldProps {
  options?: { label: string; value: string }[];
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  defaultOption?:string;
  onChange:(value:string)=>void

  

}

export default function SelectField({
  options,
  label,
  name,
  required,
  error,
  value,
  defaultOption,
  onChange
}: SelectFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required}> *</span>
        )}
      </label>

      <select
        id={name}
        name={name}
        className={`${styles.select} ${error ? styles.selectError : ""}`}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="" disabled>
          {defaultOption}
        </option>

        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${name}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
