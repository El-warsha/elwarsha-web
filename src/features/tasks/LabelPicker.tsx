import { Button } from "@ui/components/Button/Button.js";
import styles from "./LabelPicker.module.css";

type Track = "all" | "frontend" | "backend";

type LabelPickerProps = {
  value: Track;
  onChange: (value: Track) => void;
};

export function LabelPicker({ value, onChange }: LabelPickerProps) {
  return (
    <div className={styles.picker} role="group" aria-label="Filter tasks">
      <Button
        className={value === "all" ? styles.selectedTrack : ""}
        onClick={() => onChange("all")}
        aria-pressed={value === "all"}
      >
        All
      </Button>

      <Button
        className={value === "frontend" ? styles.selectedTrack : ""}
        onClick={() => onChange("frontend")}
        aria-pressed={value === "frontend"}
      >
        Frontend
      </Button>

      <Button
        className={value === "backend" ? styles.selectedTrack : ""}
        onClick={() => onChange("backend")}
        aria-pressed={value === "backend"}
      >
        Backend
      </Button>
    </div>
  );
}