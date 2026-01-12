import axios, { type AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const productsApi = axios.create({
	baseURL: process.env.PRODUCT_API_BASE_URL,
});

export type { AxiosResponse };
