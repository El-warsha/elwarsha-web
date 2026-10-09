import type { Label } from "@entities/assignment";
import { Badge } from "@ui/components/Badge/Badge";
import styles from "./TasksPage.module.css";

type LabelChipProps = {
  label: Label;
};

export function LabelChip({ label }: LabelChipProps) {
  return (
    <span className={styles.chipBadge}>
      <Badge>{label.name}</Badge>
    </span>
  );
}