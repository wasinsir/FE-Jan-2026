import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { add, update, updateFilter } from "./ProductsSlice";
import {
  getFilteredProducts,
  getSelectedFilter,
  getProductsValue,
  getAllProductSKUs,
} from "./ProductsSelector";
import type { Product } from "../../types/product";
import { createMockStore } from "../../mocks/store";
import { mockProducts } from "../../mocks/products";

describe("Products Store", () => {
  describe("ProductsSlice Reducers", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-03"));
    });

    it("add action adds a new product", () => {
      const store = createMockStore([]);

      const newProduct: Product = {
        id: "1",
        name: "New Product",
        sku: "SKU003",
        price: 75,
        stock: 8,
        category: "Clothing",
        createdAt: "2024-01-03",
      };

      store.dispatch(add(newProduct));
      const state = store.getState();

      expect(state.products.productList).toHaveLength(1);
      expect(state.products.productList[0]).toEqual({
        ...newProduct,
        id: "1",
        createdAt: "2024-01-03T00:00:00.000Z",
      });
    });

    it("update action updates an existing product", () => {
      const store = createMockStore();

      const updatedProduct: Product = {
        ...mockProducts[0],
        name: "Updated Product 1",
        price: 150,
      };

      store.dispatch(update(updatedProduct));
      const state = store.getState();

      expect(state.products.productList[0]).toEqual(updatedProduct);
    });

    it("updateFilter action sets the selected filter", () => {
      const store = createMockStore();

      store.dispatch(updateFilter("Food"));
      const state = store.getState();

      expect(state.products.selectedFilter).toBe("Food");
    });
  });

  describe("Products Selectors", () => {
    it("getFilteredProducts returns all products when no filter is selected", () => {
      const store = createMockStore();
      const state = store.getState();

      const filtered = getFilteredProducts(state);

      expect(filtered).toEqual(mockProducts);
      expect(filtered).toHaveLength(4);
    });

    it("getFilteredProducts returns filtered products when filter is selected", () => {
      const store = createMockStore(mockProducts, "");
      const state = store.getState();

      const filtered = getFilteredProducts(state);

      expect(filtered).toHaveLength(4);
      expect(filtered[0].category).toBe("Food");
    });

    it("getSelectedFilter returns the current filter", () => {
      const store = createMockStore(mockProducts, "Beverages");
      const state = store.getState();

      const filter = getSelectedFilter(state);

      expect(filter).toBe("Beverages");
    });

    it("getProductsValue calculates total product value", () => {
      const store = createMockStore();
      const state = store.getState();

      const value = getProductsValue(state);

      const expected = 45 * 20 + 20 * 50 + 35 * 0 + 299 * 5; // 3395
      expect(value).toBe(expected);
    });

    it("getAllProductSKUs returns all product SKUs", () => {
      const store = createMockStore();
      const state = store.getState();

      const skus = getAllProductSKUs(state);

      expect(skus).toEqual([
        mockProducts[0].sku,
        mockProducts[1].sku,
        mockProducts[2].sku,
        mockProducts[3].sku,
      ]);
      expect(skus).toHaveLength(4);
    });

    it("getSelectedFilter returns undefined when no filter is set", () => {
      const store = createMockStore(mockProducts);
      const state = store.getState();

      const filter = getSelectedFilter(state);

      expect(filter).toBeUndefined();
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
