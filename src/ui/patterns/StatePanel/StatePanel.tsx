import styles from "./StatePanel.module.css";

export function StatePanel({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.panel} role="status">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
