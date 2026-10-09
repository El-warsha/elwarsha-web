import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";


export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabel, selectLabel } = useTasks();

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={copy.portal.assignments}
    >
      <LabelPicker
        labels={labels}
        selectedLabel={selectedLabel}
        onSelect={selectLabel}
        locale={locale}
      />

      {tasks === null ? (
        <p role="status">{copy.portal.loading}</p>
      ) : tasks.length === 0 ? (
        <p>{copy.portal.empty}</p>
      ) : (
        <ul className="assignments">
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>

              <p>
                {copy.portal.week} {task.weekNumber}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}