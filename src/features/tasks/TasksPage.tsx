import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./useTasks.js";
import { LabelChip } from "./LabelChip.js";
import { LabelPicker } from "./LabelPicker.js"; 

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const task = tasks?.[0];

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
      <div className="mb-4">
        <LabelPicker
          labels={task?.labels ?? []}
          onSelectLabel={() => undefined}
        />
      </div>

      {task ? (
        <div className="space-y-2">
          <p>
            {copy.portal.week} {task.weekNumber}
          </p>
          <div className="flex gap-2 flex-wrap">
            {task.labels?.map((label) => (
              <LabelChip key={label.id} label={label} />
            ))}
          </div>
        </div>
      ) : null}
    </PageSection>
  );
}