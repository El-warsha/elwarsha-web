import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./hooks/useTasks.js";
import { LabelPicker } from "@features/tasks/components/LabelPicker/LabelPicker.js";
import { useState } from "react";
import { AssignmentCard } from "./components/AssignmentCard/AssignmentCard.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>("all");

  const labels= tasks?.flatMap(({labels})=>{return labels})    ;
  const labelPicker = labels ? (
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
      title={ copy.portal.title}
    >
      {tasks ? (
        tasks.map((task)=>
       <AssignmentCard assignment={task} locale={locale}></AssignmentCard>)
      ) 
      : null}
    </PageSection>
  );
}
