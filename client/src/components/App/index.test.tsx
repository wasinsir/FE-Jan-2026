import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./index";
import { createMockStore } from "../../mocks/store";

describe("App Component", () => {
  it("renders the app container", () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(container).toBeInTheDocument();
  });

  it("renders main application components", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // App should render without errors
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
