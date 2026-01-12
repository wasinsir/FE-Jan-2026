import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import ProductList from "./index";
import { createMockStore } from "../../mocks/store";

describe("ProductList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("Product name")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("shows no products message when list empty", () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    expect(screen.getByText("No products available")).toBeInTheDocument();
  });

  it("renders sale buttons with correct disabled state based on stock", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    const saleButtons = screen.getAllByRole("button", { name: /sale/i });
    expect(saleButtons.length).toBeGreaterThan(0);

    // Product with stock 0 should have disabled sale button
    const disabledButton = saleButtons.find((btn) =>
      btn.hasAttribute("disabled"),
    );
    expect(disabledButton).toBeDefined();
  });

  it("renders products with correct data", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    // Check that products from mockProducts are displayed
    expect(screen.getByText("Fried Rice")).toBeInTheDocument();
    expect(screen.getByText("Orange Juice")).toBeInTheDocument();
    expect(screen.getByText("Soap")).toBeInTheDocument();
  });

  it("handles successful sale click with mocked Math.random", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Math, "random").mockReturnValue(0.6); // Ensure success path

    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    const saleButton = screen.getByTestId("product-sale-1");
    await user.click(saleButton);

    expect(alertSpy).toHaveBeenCalledWith("Sale processed successfully.");
    alertSpy.mockRestore();
  });

  it("handles failed sale click with mocked Math.random", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Math, "random").mockReturnValue(0.2); // Ensure failure path

    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    const saleButton = screen.getByTestId("product-sale-1");
    await user.click(saleButton);

    expect(alertSpy).toHaveBeenCalledWith(
      "Failed to process sale. Please try again.",
    );
    alertSpy.mockRestore();
  });

  it("disables sale button for out of stock products", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>,
    );

    const outOfStockButton = screen.getByTestId("product-sale-3");
    expect(outOfStockButton).toBeDisabled();
  });
});
