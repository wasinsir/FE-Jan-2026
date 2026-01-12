import { configureStore } from "@reduxjs/toolkit";
import produceReducer from "./ProductStore/ProductsSlice";

export const store = configureStore({
  reducer: {
    products: produceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
