import { useEffect, useState } from "react";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";
import type { Assignment } from "@elwarsha/api-client";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
        if (!cancelled) {
          setTasks(rows.length > 0 ? rows : [assignmentFixture]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTasks([assignmentFixture]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks };
}
