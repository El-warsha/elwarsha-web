import { describe, expect, it } from "vitest";

import { weekSchema } from "./weeks.schema.js";

describe("weeks.schema", () => {
  const validWeek = {
    weekNumber: 1,
    title: "Navigate the codebase",
    tagline: "Find the boundaries before changing code",
    concept: "Architecture and modularity",
    guidingQuestion: "How does a request travel without breaking boundaries?",
    startDate: "2026-10-01",
    endDate: "2026-10-07",
    isCurrent: true,
    status: "active" as const,
    isLocked: false,
    cohort: {
      id: "cohort-1",
      slug: "cohort-01",
      name: "Cohort 01",
      startsOn: "2026-10-01",
      endsOn: "2026-11-26",
    },
    bigIdea: "Understand module boundaries before modifying existing code.",
    outcomes: ["Trace request", "Map modules"],
    coreConcepts: ["Separation of concerns", "Dependency injection"],
    appliedThroughTheStack: [
      { layer: "React", details: "Feature folders and unidirectional flow" },
      { layer: "NestJS", details: "Modules and controllers" },
    ],
    assignment: {
      id: "assignment-1",
      title: "Navigate the codebase and open a focused PR",
      summary: "Trace the slice and submit PR",
      status: "published" as const,
      labels: ["frontend", "backend"],
      detailsMd: "# Deliverables\n- Open PR",
    },
    resources: {
      required: [
        {
          title: "ARCHITECTURE.md",
          url: "https://github.com",
          layers: "Full Stack",
          format: "Read",
          time: "15 min",
          why: "Explains architecture",
        },
      ],
      assignment: [],
      alternative: [],
    },
    reflectionQuestion: "Which boundary would you break?",
    prerequisites: ["Node 22"],
  };

  it("successfully parses a valid unified week object", () => {
    expect(() => weekSchema.parse(validWeek)).not.toThrow();
  });

  it("allows null for assignment in locked/upcoming week", () => {
    const weekNoAssignment = { ...validWeek, assignment: null, isLocked: true };
    const parsed = weekSchema.parse(weekNoAssignment);
    expect(parsed.assignment).toBeNull();
    expect(parsed.isLocked).toBe(true);
  });

  it("fails parsing if weekNumber is outside 1..8 range", () => {
    expect(() => weekSchema.parse({ ...validWeek, weekNumber: 0 })).toThrow();
    expect(() => weekSchema.parse({ ...validWeek, weekNumber: 9 })).toThrow();
  });

  it("fails parsing if status is not an allowed enum", () => {
    expect(() => weekSchema.parse({ ...validWeek, status: "unknown" })).toThrow();
  });
});
