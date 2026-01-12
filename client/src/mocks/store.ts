import { configureStore } from "@reduxjs/toolkit";
import { mockProducts } from "./products";
import productsReducer from "../store/ProductStore/ProductsSlice";

export const createMockStore = (
  productsList = mockProducts,
  selectedFilter?: string,
) => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        productList: productsList,
        selectedFilter: selectedFilter,
      },
    },
  });
};
