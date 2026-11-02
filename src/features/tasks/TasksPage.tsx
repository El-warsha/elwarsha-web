import { useParams } from "react-router-dom";
import { isLocale, messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";
import { LabelPicker } from "./LabelPicker.js";
import { useTasks } from "./useTasks.js";

export function TasksPage() {
  const { locale } = useParams<{ locale: string }>();
  const currentLocale: Locale = isLocale(locale) ? locale : "ar";
  const copy = messages[currentLocale] || messages["ar"];

  const { tasks, labels, isLoading, selectedLabelId, setSelectedLabelId } = useTasks();

  return (
    <div dir={currentLocale === "ar" ? "rtl" : "ltr"}>
      <PageSection
        eyebrow={currentLocale === "ar" ? "التكاليف" : "Assignments"}
        title={currentLocale === "ar" ? "المهام والتكاليف" : "Tasks & Assignments"}
      >
        <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
            {currentLocale === "ar" ? "تصفية حسب التصنيف:" : "Filter by Label:"}
          </span>
          <LabelPicker
            labels={labels}
            selectedLabelId={selectedLabelId}
            onSelectLabel={setSelectedLabelId}
          />
        </div>

        {isLoading ? (
          <p>{currentLocale === "ar" ? "جاري تحميل المهام..." : "Loading tasks..."}</p>
        ) : tasks.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            {currentLocale === "ar" 
              ? "لا توجد مهام مطابقة لهذا التصنيف." 
              : "No tasks found for this label."}
          </p>
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
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {task.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: 0,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {currentLocale === "ar" ? "الأسبوع" : "Week"} {task.weekNumber}
                  </span>
                  <span>•</span>
                  <span>
                    {currentLocale === "ar" ? "الحالة: " : "Status: "}
                    <span style={{ textTransform: "capitalize" }}>
                      {currentLocale === "ar"
                        ? task.status === "Published"
                          ? "منشور"
                          : task.status === "Draft"
                          ? "مسودة"
                          : task.status
                        : task.status}
                    </span>
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
}