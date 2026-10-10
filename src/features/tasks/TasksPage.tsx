import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./hooks/useTasks.js";
import { LabelPicker } from "@features/tasks/components/LabelPicker/LabelPicker.js";
import { useState } from "react";
import { AssignmentCard } from "./components/AssignmentCard/AssignmentCard.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  const labels = [
    ...new Map(
      (tasks ?? []).flatMap((task) => task.labels).map((label) => [label.id, label]),
    ).values(),
  ];
  const filteredTasks = (tasks ?? []).filter((task) => {
  if (selectedLabelId === null) {
    return true;
  }

  return task.labels.some(
    (label) => label.id === selectedLabelId,
  );
});

  const labelPicker = labels.length > 0 ? (
    <LabelPicker
      title={copy.portal.labelPickerTitle}
      labels={labels}
      value={selectedLabelId}
      onChange={setSelectedLabelId}
    ></LabelPicker>
  ) : null;
  return (
    <PageSection
      labelPicker={labelPicker}
      eyebrow={copy.portal.assignments}
      title={copy.portal.title}
    >
      {
         filteredTasks.map((task) => (
            <AssignmentCard key={task.id} assignment={task} locale={locale}></AssignmentCard>
          ))
        }
    </PageSection>
  );
}
