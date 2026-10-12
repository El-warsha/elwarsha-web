import { messages, type Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import styles from "./TasksPage.module.css";
import { TaskLabels } from "./TaskLabels.js";
import { useTasks } from "./useTasks.js";

const DEFAULT_LABELS: Record<number, string[]> = {
  1: ["Architecture", "Modularity"],
};

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const task = tasks?.[0];
  const labels =
    (task as { labels?: string[] })?.labels ??
    (task ? DEFAULT_LABELS[task.weekNumber] ?? [] : []);

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
      {task ? (
        <div className={styles.card}>
          <div className={styles.meta}>
            <span className={styles.week}>
              {copy.portal.week} {task.weekNumber}
            </span>
            <Badge>{task.status}</Badge>
          </div>
          <TaskLabels labels={labels} />
        </div>
      ) : null}
    </PageSection>
  );
}
