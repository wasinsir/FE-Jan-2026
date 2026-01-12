import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./index";

describe("Select Component", () => {
  const mockOptions = [
    { value: "", label: "All" },
    { value: "food", label: "Food" },
    { value: "drink", label: "Drinks" },
  ];

  it("renders select element", () => {
    render(<Select />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all options provided", () => {
    render(<Select options={mockOptions} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("displays the selected value", () => {
    render(<Select options={mockOptions} value="food" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("food");
  });

  it("calls onChange handler when selection changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "food");

    expect(handleChange).toHaveBeenCalled();
  });

  it("handles empty options array", () => {
    render(<Select options={[]} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders without options prop", () => {
    render(<Select />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
