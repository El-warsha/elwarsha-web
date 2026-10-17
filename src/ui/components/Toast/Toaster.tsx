import { useToastStore } from "@core/toast";
import styles from "./Toaster.module.css";

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.toasterContainer} role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live={toast.type === "error" ? "assertive" : "polite"}
        >
          <span className={styles.icon} aria-hidden="true">
            {toast.type === "error" && "⚠️"}
            {toast.type === "success" && "✅"}
            {toast.type === "warning" && "⚡"}
            {toast.type === "info" && "ℹ️"}
          </span>
          <span className={styles.message}>{toast.message}</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
