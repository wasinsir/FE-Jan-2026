import type { Product } from "../types/product";

const mockProduct1: Product = {
  name: "Fried Rice",
  sku: "1",
  price: 45,
  stock: 20,
  category: "Food",
  id: "1",
  createdAt: "11-01-2026",
};

const mockProduct2: Product = {
  name: "Orange Juice",
  sku: "2",
  price: 20,
  stock: 50,
  category: "Beverages",
  id: "2",
  createdAt: "11-01-2026",
};

const mockProduct3: Product = {
  name: "Soap",
  sku: "3",
  price: 35,
  stock: 0,
  category: "Household",
  id: "3",
  createdAt: "11-01-2026",
};

const mockProduct4: Product = {
  name: "T-Shirt",
  sku: "4",
  price: 299,
  stock: 5,
  category: "Clothing",
  id: "4",
  createdAt: "11-01-2026",
};

const mockEmptyProduct: Product = {
  name: "T-Shirt",
  sku: "5",
  price: 299,
  stock: 0,
  category: "Clothing",
  id: "5",
  createdAt: "11-01-2026",
};
const mockProducts: Product[] = [
  mockProduct1,
  mockProduct2,
  mockProduct3,
  mockProduct4,
];

export {
  mockProducts,
  mockProduct1,
  mockProduct2,
  mockProduct3,
  mockProduct4,
  mockEmptyProduct,
};
