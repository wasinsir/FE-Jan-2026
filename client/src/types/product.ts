export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: ProductCategory;
  createdAt: string;
}

const ProductCategory = {
  Food: "Food",
  Beverages: "Beverages",
  Clothing: "Clothing",
  Household: "Household",
} as const;
export type ProductCategory = keyof typeof ProductCategory;
