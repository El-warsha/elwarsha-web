import { Label } from "@entities/assignment";
import styles from "./LabelChip.module.css";

interface LabelChipProps {
    label: Label;
}

const LabelChip = ({ label }: LabelChipProps) => {
  return (
    <span
      className={styles.labelChip}
    >
      {label.name}
    </span>
  )
}

export default LabelChip