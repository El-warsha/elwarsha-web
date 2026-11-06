import { useEffect, useMemo, useState } from "react";

import { api } from "@core/api";
import type { Assignment } from "@entities/assignment";

export function useTasks(selectedLabelId?: string | null) {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
        if (!cancelled) setTasks(rows);
      })
      .catch(() => {
        if (!cancelled) setTasks([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // تصفية المهام حسب اللابل المحدد
  const filteredTasks = useMemo(() => {
    if (!tasks) return null;
    if (!selectedLabelId) return tasks;

    return tasks.filter((task) =>
      task.labels?.some((label) => label.id === selectedLabelId)
    );
  }, [tasks, selectedLabelId]);

  return { tasks: filteredTasks };
}