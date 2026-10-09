
import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";

const PAGE_SIZE = 10;

export function useTasks(labelId: string | null) {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setTasks(null);
    setNextCursor(null);

    api
      .listAssignments({
        labelId: labelId ?? undefined,
        limit: PAGE_SIZE,
      })
      .then((response) => {
        if (!cancelled) {
          setTasks(response.items);
          setNextCursor(response.nextCursor);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTasks([]);
          setNextCursor(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [labelId]);

  useEffect(() => {
    let cancelled = false;

    api
      .listLabels()
      .then((rows) => {
        if (!cancelled) {
          setLabels(rows);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLabels([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = async () => {
    if (!nextCursor || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.listAssignments({
        labelId: labelId ?? undefined,
        limit: PAGE_SIZE,
        cursor: nextCursor,
      });

      setTasks((currentTasks) => [
        ...(currentTasks ?? []),
        ...response.items,
      ]);

      setNextCursor(response.nextCursor);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    labels,
    nextCursor,
    loading,
    loadMore,
  };
}

