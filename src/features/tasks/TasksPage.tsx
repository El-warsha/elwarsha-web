import { useState } from "react";

import { messages, type Locale } from "@core/i18n";
import { PageSection } from "@ui/patterns/PageSection/PageSection";

import { LabelPicker } from "./LabelPicker.js";
import { LabelChip } from "./LabelChip.js";
import { useTasks } from "./useTasks.js";
import styles from "./TasksPage.module.css";

export function TasksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  const {
    tasks,
    labels,
    nextCursor,
    loading,
    loadMore,
  } = useTasks(selectedLabelId);

  return (
    <PageSection
      eyebrow={copy.portal.assignments}
      title={copy.portal.assignments}
    >
      <div className={styles.container}>
        <LabelPicker
          labels={labels ?? []}
          onChange={setSelectedLabelId}
        />

        {tasks?.map((task) => (
          <article key={task.id} className={styles.taskCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerMetaData}>
                <span className={styles.weekTag}>
                  {copy.portal.week} {task.weekNumber}
                </span>

                {/* عرض الـ status الخاصة بالتاسك */}
                <span
                  className={`${styles.statusBadge} ${
                    task.status === "published"
                      ? styles.statusPublished
                      : task.status === "draft"
                      ? styles.statusDraft
                      : styles.statusClosed
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className={styles.labelsGroup}>
                {task.labels.map((label) => (
                  <LabelChip
                    key={label.id}
                    label={label}
                  />
                ))}
              </div>
            </div>

            <h2 className={styles.taskTitle}>{task.title}</h2>
          </article>
        ))}

        {nextCursor ? (
          <div className={styles.loadMoreWrapper}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        ) : null}
      </div>
    </PageSection>
  );
}