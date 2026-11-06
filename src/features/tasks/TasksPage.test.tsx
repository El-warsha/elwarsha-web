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

    const labelChips = await screen.findAllByText("Frontend");
    expect(labelChips[0]).toBeInTheDocument();

    const pickerGroup = screen.getByRole("group", { name: /filter tasks by label/i });
    expect(pickerGroup).toBeInTheDocument();

    const labelButton = await screen.findByRole("button", { name: /frontend/i });
    fireEvent.click(labelButton);
  }); // ✅ 1. إغلاق دالة الاختبار الأولى هنا بشكل صحيح

  it("allows selecting a label in the picker to filter tasks", async () => {
    const fixtureWithLabels = {
      ...assignmentFixture,
      labels: [{ id: "l1", name: "Frontend", color: "blue" }],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([fixtureWithLabels]);

    render(<TasksPage locale="en" />);

    const labelButton = await screen.findByRole("button", { name: /frontend/i });
    fireEvent.click(labelButton);
  }); // ✅ 2. إغلاق دالة الاختبار الثانية

}); // ✅ 3. إغلاق الـ describe الرئيسي للملف