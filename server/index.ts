import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { ProductsControllers } from "./src/controller/productsControllers";
import { ProductsRepository } from "./src/repository/productsRepositories";
import { ProductsServices } from "./src/service/productsServices";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

  // Security middleware
  app.use(cors({ origin: process.env.CLIENT_SIDE_URL }));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  	//TODO: refactor 
    const productsRepository = new ProductsRepository();
    const productsService = new ProductsServices(productsRepository);
    const productsController = new ProductsControllers(productsService);

    app.post('/api/products', productsController.createProduct);
    app.get('/api/products', productsController.getProducts);
    app.get('/api/products/sell', productsController.sellProduct);
    app.get('/api/products/search', productsController.searchProducts);
    app.put('/api/products/bulk-price-update', productsController.bulkPriceUpdate);


// Health check endpoint
app.get('/health', (_req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
	console.log(`✨ Server is running on http://localhost:${port}`);
});
