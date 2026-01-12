import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./index";

describe("Button Component", () => {
  it("renders the button with the provided label", () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button label="Submit" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /submit/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button label="Disabled Button" disabled={true} />);
    const button = screen.getByRole("button", { name: /disabled button/i });

    expect(button).toBeDisabled();
  });

  it("is enabled when disabled prop is false", () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole("button", { name: /enabled button/i });

    expect(button).not.toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button label="Disabled" onClick={handleClick} disabled={true} />);
    const button = screen.getByRole("button", { name: /disabled/i });

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("accepts and applies HTML button attributes", () => {
    render(
      <Button
        label="Button"
        data-testid="custom-button"
        className="custom-class"
      />,
    );
    const button = screen.getByTestId("custom-button");

    expect(button).toHaveAttribute("data-testid", "custom-button");
  });
});
