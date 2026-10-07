import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./hooks/useTasks.js";
import { LabelChip } from "@ui/components/LabelChip/LabelChip.js";
import { LabelPicker } from "@ui/components/LabelPicker/LabelPicker.js";
import { useState } from "react";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>('all');

  const task = tasks?.[0];
  const labels = task?.labels;
  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
      {task ? (
        <p>
          {copy.portal.week} {task.weekNumber}
        </p>
      ) : null}
      <div> {labels && labels.map((label) => <LabelChip label={label}></LabelChip>)}</div>
     { labels&&<LabelPicker
        labels={labels}
            value={selectedLabelId}
        onChange={setSelectedLabelId}
      ></LabelPicker>}
    </PageSection>
  );
}
