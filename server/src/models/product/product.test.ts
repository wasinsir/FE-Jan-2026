import { describe, it, expect } from "vitest";
import { Product } from ".";

describe("Product model shape", () => {
  it("can create a product object and has required fields", () => {
    const p = {
      id: "1",
      name: "X",
      sku: "S1",
      price: 10,
      stock: 5,
      category: "Food" as Product["category"],
      createdAt: new Date().toISOString(),
    };
    expect(p).toHaveProperty("id");
    expect(p).toHaveProperty("sku");
  });
});
