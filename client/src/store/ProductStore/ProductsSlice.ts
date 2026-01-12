import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductCategory } from "../../types/product";
import { mockProducts } from "../../mocks/products";
import type { ProductsState } from "./types";

const initialState: ProductsState = {
  productList: mockProducts,
  selectedFilter: undefined,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //Connect with API later
    add: (state, action: PayloadAction<Product>) => {
      const productsWithData = {...action.payload, id: (state.productList.length + 1).toString(), createdAt: new Date().toISOString()};
      state.productList.push(productsWithData);
    },
    update: (state, action: PayloadAction<Product>) => {
      const newState = state.productList.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
      return { ...state, productList: newState };
    },
    updateFilter: (state, action: PayloadAction<ProductCategory>) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { add, update, updateFilter } = productsSlice.actions;
export default productsSlice.reducer;
