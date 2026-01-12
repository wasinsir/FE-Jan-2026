import { ProductsRepository } from "../../repository/productsRepositories";
import { Product } from "../../models/product";

export class ProductsServices {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  createProduct = async (product: Product): Promise<Product> => {
    return this.productsRepository.createProduct(product);
  };

  getProducts = async (filter?: string): Promise<Product[]> => {
    return this.productsRepository.getAllProducts(filter);
  };

  sellProduct = async (
    productId: string,
    quantity: number,
  ): Promise<Product> => {
    return this.productsRepository.sellProduct(productId, quantity);
  };

  searchProducts = async (query: string): Promise<Product[]> => {
    return this.productsRepository.searchProducts(query);
  };

  bulkPriceUpdate = async (
    updatingList: { id: number; newPrice: number }[],
  ): Promise<Product[]> => {
    return this.productsRepository.bulkPriceUpdate(updatingList);
  };
}
