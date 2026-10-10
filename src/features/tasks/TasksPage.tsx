import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./useTasks.js";
import styles from "./TasksPage.module.css";
import { LabelChip } from "./Label-chip/LabelChip.js";
import { LabelPicker } from "./Label-picker/LabelPicker.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabels, setSelectedLabels } = useTasks();

  if (!tasks) {
    return (
      <PageSection eyebrow={copy.portal.assignments} title={copy.portal.loading}>
        <p>{copy.portal.loading}</p>
      </PageSection>
    );
  }

  console.log(tasks);
  return (
    <PageSection eyebrow={copy.portal.assignments} title={copy.portal.assignments}>
      <LabelPicker
        labels={labels}
        selected={selectedLabels}
        onChange={setSelectedLabels}
      />

      {tasks.length === 0 ? (
        <p>{copy.portal.noTasks}</p>
      ) : (
        <ul className={styles.tasksList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <p className={styles.taskMeta}>
                {copy.portal.week} {task.weekNumber}
              </p>

              {task.labels.length > 0 ? (
                <ul className={styles.labelsList} aria-label={copy.portal.labels}>
                  {task.labels.map((label) => (
                    <li key={label.id}>
                      <LabelChip label={label} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
