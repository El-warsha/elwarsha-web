import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";
import { log } from "console";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listLabels()
      .then((rows) => {
        if (!cancelled) {
          setLabels(rows);
        }
      })
      .catch((e) => {
        console.error("failed to load labels:", e);

        if (!cancelled) {
          setLabels([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments(
        selectedLabel ? { label: selectedLabel } : undefined
      )
      .then((rows) => {
        if (!cancelled) {
          setTasks(rows);
        }
      })
      .catch((e) => {
        console.error("failed to load assignments:", e);

        if (!cancelled) {
          setTasks([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedLabel]);

  function selectLabel(name: string | null) {
    setSelectedLabel(name);
  }

  return {
    tasks,
    labels,
    selectedLabel,
    selectLabel,
  };
}