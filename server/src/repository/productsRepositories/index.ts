import { Product } from "../../models/product";
export class ProductsRepository {
    private products: Product[] = [];

    async createProduct(product: Product): Promise<Product> {
        const index = this.products.findIndex(p => p.sku === product.sku);
        if (index !== -1) {
            return Promise.reject(new Error("Product with this SKU already exists"));
        } else {
            this.products.push(product);
            return Promise.resolve(product);
        }
    }

    async getAllProducts(filter?: string): Promise<Product[]> {
        return Promise.resolve(filter ? this.products.filter(p => p.category === filter) : this.products);
    }


    async sellProduct(productId: string, quantity: number): Promise<Product> {
        const index = this.products.findIndex(p => p.id === productId);
        if(index === -1) {
            return Promise.reject(new Error("Product not found"));
        }
        if(this.products[index]?.stock && this.products[index].stock >= quantity) {
            this.products[index].stock -= quantity;
            return Promise.resolve(this.products[index]);
        } else {
            return Promise.reject(new Error("Product out of stock"));
        }
    }

    async searchProducts(query: string): Promise<Product[]> {
        const lowerCaseQuery = query.toLowerCase();
        const results = this.products.filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.sku.toLowerCase().includes(lowerCaseQuery));
        return Promise.resolve(results);
    }

    async updateProductPrice(productId: number, newPrice: number): Promise<Product | null> {
        const index = this.products.findIndex(p => p.id === productId.toString());
        if(index === -1) {
            return Promise.resolve(null);
        }
        this.products[index].price = newPrice;
        return Promise.resolve(this.products[index]);
    }

    async bulkPriceUpdate(updatingList: {id: number, newPrice: number}[]): Promise<Product[]> {
        const updatedProducts: Product[] = [];
        for(const item of updatingList) {
            const updatedProduct = await this.updateProductPrice(item.id, item.newPrice);
            if(updatedProduct) {
                updatedProducts.push(updatedProduct);
            }
        }
        return Promise.resolve(updatedProducts);
    }
}