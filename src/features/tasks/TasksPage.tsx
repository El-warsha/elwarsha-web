import { LabelChip } from "./LabelChip.js";
import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, selectedLabelId, setSelectedLabelId } = useTasks();
  const task = tasks?.[0];

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
      {task ? (
        <>
          <p>
            {copy.portal.week} {task.weekNumber}
          </p>
          <div>
            {task.labels.map((label) => (
              <LabelChip key={label.id} label={label} />
            ))}
          </div>
        </>
      ) : null}
      <LabelPicker
        labels={labels}
        selectedLabelId={selectedLabelId}
        onSelect={setSelectedLabelId}
        locale={locale}
      />
    </PageSection>
  );
}
