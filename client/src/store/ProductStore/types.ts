import type { Product, ProductCategory } from "../../types/product";

export interface ProductsState {
  productList: Product[];
  selectedFilter?: ProductCategory;
}
