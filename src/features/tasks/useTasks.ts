import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment } from "@entities/assignment.js";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    api.listAssignments().then((rows) => {
      if (!cancelled) {
        setTasks(rows);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks };
}