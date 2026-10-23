import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { LabelChip } from "./LabelChip.js";
import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabelId, selectLabel } = useTasks();

  return (
    <PageSection eyebrow={copy.portal.assignments} title={copy.portal.assignments}>
      {tasks === null ? (
        <p>{copy.portal.loading}</p>
      ) : (
        <>
          <LabelPicker
            labels={labels}
            selectedId={selectedLabelId}
            onSelect={selectLabel}
            locale={locale}
          />
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h2>{task.title}</h2>
                <p>
                  {copy.portal.week} {task.weekNumber}
                </p>
                {task.labels.map((label) => (
                  <LabelChip key={label.id} name={label.name} />
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </PageSection>
  );
}
