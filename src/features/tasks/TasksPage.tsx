import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { LabelChip } from "./LabelChip.js";
import { LabelPicker } from "./LabelPicker.js";
import styles from "./TasksPage.module.css";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabelId, selectLabel } = useTasks();

  return (
    <PageSection title={copy.portal.assignments}>
      {labels.length > 0 ? (
        <LabelPicker
          allLabel="All"
          labels={labels}
          selectedId={selectedLabelId}
          onSelect={selectLabel}
        />
      ) : null}

      {tasks === null ? <p>{copy.portal.loading}</p> : null}
      {tasks?.length === 0 ? <p>{copy.portal.empty}</p> : null}

      {tasks?.map((task) => (
        <article key={task.id}>
          <h2>{task.title}</h2>
          <p>
            {copy.portal.week} {task.weekNumber}
          </p>
          <div className={styles.labels}>
            {task.labels.map((label) => (
              <div key={label.id}>
                <LabelChip label={label} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </PageSection>
  );
}
