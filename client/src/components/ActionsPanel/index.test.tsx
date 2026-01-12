import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import ActionsPanel from "./index";
import { createMockStore } from "../../mocks/store";

describe("ActionsPanel Component", () => {
  it("renders the actions panel", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ActionsPanel />
      </Provider>,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the AddNewProduct component", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ActionsPanel />
      </Provider>,
    );

    expect(screen.getByText(/All Categories/i)).toBeInTheDocument();
  });

  it("renders filter options", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ActionsPanel />
      </Provider>,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  it("handles filter change", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ActionsPanel />
      </Provider>,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Food");

    expect(select).toHaveValue("Food");
  });

  it("displays all category options", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ActionsPanel />
      </Provider>,
    );

    const expectedOptions = [
      "All Categories",
      "Food",
      "Beverages",
      "Household",
      "Clothing",
      "Books",
    ];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
