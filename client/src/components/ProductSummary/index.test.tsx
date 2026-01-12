import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProductSummary from "./index";
import { createMockStore } from "../../mocks/store";

describe("ProductSummary Component", () => {
  it("renders the summary container", () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ProductSummary />
      </Provider>,
    );

    expect(container).toBeInTheDocument();
  });

  it("displays summary information", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductSummary />
      </Provider>,
    );

    // Component should render without errors
    expect(screen.getByText(/Total/, { exact: false })).toBeInTheDocument();
  });
});
