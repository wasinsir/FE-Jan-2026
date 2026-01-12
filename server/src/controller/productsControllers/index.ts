import { Request, Response } from "express";
import { ProductsServices } from "../../service/productsServices";
import { Product } from "../../models/product";

export class ProductsControllers {
  constructor(private productsServices: ProductsServices) {
    this.productsServices = productsServices;
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const product: Product = req.body;
      const createdProduct = await this.productsServices.createProduct(product);
      return res.status(201).json(createdProduct);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getProducts = async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const productsList = await this.productsServices.getProducts(category);
      return res.json(productsList);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  sellProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const quantity = parseInt(req.params.quantity as string, 10);
      const soldProduct = await this.productsServices.sellProduct(id, quantity);
      return res.json(soldProduct);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  searchProducts = async (req: Request, res: Response) => {
    try {
      const query = req.query.keyword as string;
      const productsList = await this.productsServices.searchProducts(query);
      return res.json(productsList);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  bulkPriceUpdate = async (req: Request, res: Response) => {
    try {
      const updatingList = req.body as { id: number; newPrice: number }[];
      const productsList =
        await this.productsServices.bulkPriceUpdate(updatingList);
      return res.json(productsList);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}
