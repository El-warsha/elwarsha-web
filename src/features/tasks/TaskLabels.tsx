import styles from "./TaskLabels.module.css";

export function TaskLabels({ labels }: { labels: readonly string[] }) {
  if (!labels.length) return null;

  return (
    <ul className={styles.list} aria-label="Assignment labels">
      {labels.map((label) => (
        <li key={label} className={styles.item}>
          <span className={styles.label}>{label}</span>
        </li>
      ))}
    </ul>
  );
}
