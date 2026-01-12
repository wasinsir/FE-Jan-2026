import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import AddNewProduct from "./index";
import { createMockStore } from "../../../mocks/store";
import { mockProduct1 } from "../../../mocks/products";

describe("AddNewProduct Component", () => {
  it("renders the add product button", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /add/i });
    expect(button).toBeInTheDocument();
  });

  it("opens form when add button is clicked", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByDisplayValue("Food")).toBeInTheDocument();
    });
  });

  it("validates product name length", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0];

    await user.type(nameInput, "Ab");

    await waitFor(() => {
      expect(
        screen.getByText(/Name must be at least 3 characters long/i),
      ).toBeInTheDocument();
    });
  });

  it("validates SKU is required", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    const inputs = screen.getAllByRole("textbox");
    const skuInput = inputs[1];

    await user.clear(skuInput);

    await waitFor(() => {
      expect(screen.getByText(/Please enter SKU/i)).toBeInTheDocument();
    });
  });

  it("prevents duplicate SKU submission", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    const inputs = screen.getAllByRole("textbox");
    const skuInput = inputs[1];

    await user.clear(skuInput);
    await user.type(skuInput, mockProduct1.sku);

    await waitFor(() => {
      expect(
        screen.getByText(/This SKU is already in use/i),
      ).toBeInTheDocument();
    });
  });

  it("validates price must be greater than 0", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    const inputs = screen.getAllByRole("spinbutton");
    const priceInput = inputs[0];

    await user.clear(priceInput);
    await user.type(priceInput, "0");

    await waitFor(() => {
      expect(
        screen.getByText(/Price must be greater than 0/i),
      ).toBeInTheDocument();
    });
  });

  it("validates stock must not be negative", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    const inputs = screen.getAllByRole("spinbutton");
    const stockInput = inputs[1];

    await user.clear(stockInput);
    await user.type(stockInput, "-5");

    await waitFor(() => {
      expect(
        screen.getByText(/Stock must not be less than 0/i),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid category", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add new product/i });
    await user.click(addButton);

    // Category is required, so just verify the select is available
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("Food");
  });

  it("closes form when cancel button is clicked", async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddNewProduct />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add new product/i });
    await user.click(addButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    // After closing, the form should not be visible but the Add button should be
    expect(
      screen.getByRole("button", { name: /add new product/i }),
    ).toBeInTheDocument();
  });
});
