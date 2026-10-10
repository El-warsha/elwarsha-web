
import type { Assignment } from "@entities/assignment";

import styles from "./AssignmentCard.module.css";
import { LabelChip } from "../LabelChip/LabelChip";
import { messages } from "@core/i18n";

type AssignmentCardProps = {
  assignment: Assignment;
   locale:'en'|'ar'
};

export function AssignmentCard({
  assignment,
  locale
}: AssignmentCardProps) {
    const copy = messages[locale];
  
  return (
    <article className={styles.card}>
      <div className={styles.header}>
    

        <h2 className={styles.title}>{assignment.title}</h2>
            <span className={styles.week}>
          {copy.portal.week} {assignment.weekNumber}
        </span>
      </div>

      {assignment.labels.length > 0 && (
        <div className={styles.labels} aria-label="Assignment labels">
          {assignment.labels.map((label) => (
            <LabelChip key={label.id} label={label} />
          ))}
        </div>
      )}
    </article>
  );
}
