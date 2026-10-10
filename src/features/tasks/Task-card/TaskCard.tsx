import type { Assignment } from "@entities/assignment";
import type { Locale } from "@core/i18n";
import { messages } from "@core/i18n";

import styles from "./TaskCard.module.css";
import { LabelChip } from "../Label-chip/LabelChip";

type TaskCardProps = {
  task: Assignment;
  locale: Locale;
};

export function TaskCard({ task, locale }: TaskCardProps) {
  const copy = messages[locale];

  return (
    <li className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>

      <p className={styles.meta}>
        {copy.portal.week} {task.weekNumber}
      </p>

      {task.labels.length > 0 ? (
        <ul className={styles.labels} aria-label={copy.portal.labels}>
          {task.labels.map((label) => (
            <li key={label.id}>
              <LabelChip label={label} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
