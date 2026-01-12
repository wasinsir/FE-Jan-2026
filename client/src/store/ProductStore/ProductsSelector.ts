// import { createSelector } from "@reduxjs/toolkit";
// import type { LocationType } from "@type/machine";

import type { RootState } from "../store";

export const getFilteredProducts = (state: RootState) => {
  const selectedFilter = state.products.selectedFilter;
  if (selectedFilter) {
    return state.products.productList.filter(
      (product) => product.category === selectedFilter,
    );
  }
  return state.products.productList;
};
export const getSelectedFilter = (state: RootState) =>
  state.products.selectedFilter;

export const getProductsValue = (state: RootState) => {
  return state.products.productList.reduce(
    (acc, product) => acc + product.price * product.stock,
    0,
  );
};

export const getAllProductSKUs = (state: RootState) =>
  state.products.productList.map((product) => product.sku);
