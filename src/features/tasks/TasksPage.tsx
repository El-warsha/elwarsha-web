import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { LabelChip } from "./LabelChip.js";
import { LabelPicker } from "./LabelPicker.js";
import styles from "./TasksPage.module.css";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabelId, setSelectedLabelId } = useTasks();
  const task = tasks?.[0];

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={tasks === null ? copy.portal.loading : task ? task.title : copy.portal.empty}
    >
      {labels && labels.length > 0 ? (
        <LabelPicker
          labels={labels}
          selectedLabelId={selectedLabelId}
          onSelectLabel={setSelectedLabelId}
        />
      ) : null}

      {task ? (
        <div>
          <p>
            {copy.portal.week} {task.weekNumber}
          </p>
          {task.labels && task.labels.length > 0 ? (
            <div className={styles.labelsList} aria-label="Task labels">
              {task.labels.map((label) => (
                <LabelChip key={label.id} label={label} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </PageSection>
  );
}
