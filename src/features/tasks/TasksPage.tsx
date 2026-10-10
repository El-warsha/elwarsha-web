import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useState } from "react";
import { LabelChip, LabelPicker } from "./components";
import { useTasks } from "./useTasks.js";
import { filterdTasksBySelectedLabels, getAvailableLabels } from "./utils/index.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();
  const [ selectedLabelIDs, setSelectedLabelIDs ]= useState<string[]>([]);
  const onLabelsChange = (labels: string[]) => {
    setSelectedLabelIDs(labels);
  }

  if(!tasks) return (
    null
  );
  return (
    <>
      <LabelPicker
        availableLabels={getAvailableLabels(tasks)}
        selectedLabelIDs={selectedLabelIDs}
        onLabelsChange={onLabelsChange}
      />
      {    
        filterdTasksBySelectedLabels(tasks, selectedLabelIDs).map((task) => (        
            <PageSection
              key={task.id}
              eyebrow={copy.portal.assignments}
              title={task?.title ?? copy.portal.loading}
            >
              <div >  
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 'var(--spacing-16)' }}>
                  {task.labels?.map((label) => (
                    <LabelChip key={label.id} label={label} />
                  ))}
                </div>
                <p>
                  {copy.portal.week} {task.weekNumber}
                </p>
              </div>
            </PageSection>
        ))
      }
    </>
  )
}
