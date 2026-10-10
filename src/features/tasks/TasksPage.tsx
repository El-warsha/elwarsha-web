import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { tasks, labels, isLoading, selectedLabelId, setSelectedLabelId } = useTasks();

  return (
    <PageSection eyebrow={copy.portal.assignments} title="Tasks & Assignments">
      <div style={{ marginBottom: "24px" }}>
        <LabelPicker
          labels={labels}
          selectedLabelId={selectedLabelId}
          onSelectLabel={setSelectedLabelId}
        />
      </div>

      {isLoading ? (
        <p>{copy.portal.loading}</p>
      ) : tasks.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "15px" }}>No tasks found for this label.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {tasks.map((task: any) => (
            <div
              key={task.id}
              style={{
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#111827", margin: 0 }}>
                {task.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, display: "flex", gap: "8px", alignItems: "center" }}>
                <span>{copy.portal.week} {task.weekNumber}</span>
                <span>•</span>
                <span style={{ textTransform: "capitalize" }}>Status: {task.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </PageSection>
  );
}