import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./useTasks.js";
import styles from "./TasksPage.module.css";
import { LabelPicker } from "./Label-picker/LabelPicker.js";
import { TaskCard } from "./Task-card/TaskCard.js";

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
            <TaskCard key={task.id} task={task} locale={locale} />
          ))}
        </ul>
      )}
    </PageSection>
  );
}
