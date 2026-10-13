import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";

vi.mock("@core/api", () => ({
  api: {
    listAssignments: vi.fn(),
  },
}));

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
  });

  // 1️⃣ الاختبار الأصلي: التأكد من عرض المهام الأساسية
  it("renders the assignment returned by the data hook", async () => {
    const fixtureWithLabels = {
      ...assignmentFixture,
      labels: [{ id: "l1", name: "Frontend", color: "blue" }],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([fixtureWithLabels]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();
  });

  // 2️⃣ اختبار ظهور أسراب الـ Label Chips وتسهيلات الوصول (Accessibility)
  it("renders label chips and interactive controls with accessible names", async () => {
    const fixtureWithLabels = {
      ...assignmentFixture,
      labels: [{ id: "l1", name: "Frontend", color: "blue" }],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([fixtureWithLabels]);

    render(<TasksPage locale="en" />);

    // التأكد من ظهور الـ Label Chip على الشاشة
    const labelChip = await screen.findByText("Frontend");
    expect(labelChip).toBeInTheDocument();

    // التأكد من وجود اسم معياري لأداة اختيار/فلترة اللابل (Accessible Name)
    const pickerControl = screen.getByRole("combobox", {
      name: /filter by label/i,
    });
    expect(pickerControl).toBeInTheDocument();
  });

  // 3️⃣ اختبار عمل الـ Label Picker عند التفاعل معه
  it("allows selecting a label in the picker to filter tasks", async () => {
    const fixtureWithLabels = {
      ...assignmentFixture,
      labels: [{ id: "l1", name: "Frontend", color: "blue" }],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([fixtureWithLabels]);

    render(<TasksPage locale="en" />);

    const pickerControl = await screen.findByRole("combobox", {
      name: /filter by label/i,
    });

    // تغيير الخيار داخل الـ Picker
    fireEvent.change(pickerControl, { target: { value: "l1" } });
    expect(pickerControl).toHaveValue("l1");
  });
});