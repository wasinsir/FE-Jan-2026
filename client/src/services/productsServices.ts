import { productsApi, type AxiosResponse } from './axios';
import type { Product } from '../types/product';

export const createProduct = async (product: Product): Promise<AxiosResponse<Product>> => {
	try {
		return await productsApi.post(`/api/products`, product);
	} catch (error) {
		console.error('Error fetching product list', error);
		throw error;
	}
};

export const getProductLists = async (queryParams: string): Promise<AxiosResponse<Product[]>> => {
	try {
		return await productsApi.get(`/api/products?${queryParams}`);
	} catch (error) {
		console.error('Error fetching product list', error);
		throw error;
	}
};

export const sellProduct = async (
	id: number,
	quantity: number
): Promise<AxiosResponse<Product>> => {
	try {
		return await productsApi.post(`/api/products/sell`, { id, quantity });
	} catch (error) {
		console.error('Error selling product list', error);
		throw error;
	}
};
