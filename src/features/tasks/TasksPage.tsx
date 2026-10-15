import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { Button } from "@ui/components/Button/Button.js";
import styles from "./TasksPage.module.css";
import type { Assignment } from "@entities/assignment.js";
import { useTasks } from "./useTasks.js";
import { useState } from "react";
import { LabelPicker } from "./LabelPicker";
import { LabelChip } from "./labelChip";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const task = tasks?.[0];

  const [selectedTrack, setSelectedTrack] = useState<
    "all" | "frontend" | "backend"
  >("all");

 const filteredTasks =
  selectedTrack === "all"
    ? tasks
    : tasks?.filter((task) =>
        task.labels.some((label) => label.name === selectedTrack)
      );

  function renderTasks(tasks: Assignment[]) {
    const statusClasses = {
  published: styles.published,
  draft: styles.draft,
  closed: styles.closed,
};
    return (
      <div className={styles.container}>
        {tasks.map((task) => (
          <div className={styles.taskCard} key={task.id}>
            <div className={styles.cardTop}>
              <span className={styles.week}>
                {String(task.weekNumber).padStart(2, "0")}
              </span>
            </div>
            <h2 className={styles.h2}>
              {task.title}
            </h2>

            <div className={styles.labels}>
                {task.labels.map((label) => (
                  <LabelChip 
                    key= {label.id}
                    label={label}
                  />
                ))}
            </div>

            <div className={styles.cardBottom}>
            <span
              className={`${styles.status} ${statusClasses[task.status]}`}>
                {task.status}
            </span>
            </div>
          
          </div>

        ))}
      </div>
    );
  }

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >

      <LabelPicker 
        value= {selectedTrack}
        onChange={ setSelectedTrack }    
      />

      {renderTasks(filteredTasks ?? [])}
    </PageSection>
  );
}