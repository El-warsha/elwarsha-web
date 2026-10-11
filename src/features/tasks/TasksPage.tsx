import { useState } from "react";

import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { useTasks } from "./useTasks.js";

import { LabelChip } from "./LabelChip/LabelChip.js";
import { LabelPicker } from "./LabelPicker/LabelPicker.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks } = useTasks();

  const [filter, setFilter] = useState("");

  const task = tasks?.[0];

  const filteredLabels =
    task?.labels?.filter((label) =>
      label.name.toLowerCase().includes(filter.toLowerCase()),
    ) ?? [];

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={task?.title ?? copy.portal.loading}
    >
    
      <div>
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value)}
            placeholder="Search labels..."
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <LabelPicker labels={filteredLabels} onSelectLabel={() => undefined} />
        </div>

        {task ? (
          <div>
            <p>
              {copy.portal.week} {task.weekNumber}
            </p>

            <div>
              {filteredLabels.map((label) => (
                <LabelChip key={label.id} label={label} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageSection>
  );
}
