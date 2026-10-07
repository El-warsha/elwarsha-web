import { useState } from "react";

import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { LabelChip } from "./LabelChip.js";
import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  // 1️⃣ حالة اللابل المحدد للفلترة
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  // 2️⃣ جلب المهام المفلترة من الهوك
  const { tasks } = useTasks(selectedLabelId);

  // 3️⃣ استخراج اللابلز المتاحة بدون تكرار
  const availableLabels = Array.from(
    new Map(
      (tasks || [])
        .flatMap((task) => task.labels || [])
        .map((label) => [label.id, label])
    ).values()
  );

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={tasks?.[0]?.title ?? copy.portal.loading}
    >
      {/* أدوات اختيار وتصفية اللابلز */}
      <div role="group" aria-label="Filter labels" className="mb-4">
        <LabelPicker
          labels={availableLabels}
          selectedId={selectedLabelId}
          onSelect={setSelectedLabelId}
        />
      </div>

      {/* عرض قائمة المهام */}
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item mb-4">
            <p>
              {copy.portal.week} {task.weekNumber}
            </p>

            {task.labels && task.labels.length > 0 && (
              <div className="flex gap-1.5 mt-2" aria-label="Task labels">
                {task.labels.map((label) => (
                  <LabelChip key={label.id} label={label} />
                ))}
              </div>
            )}
          </div>
        ))
      ) : null}
    </PageSection>
  );
}