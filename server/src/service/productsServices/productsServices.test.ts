import { describe, it, expect, vi } from 'vitest'
import { ProductsServices } from '.'
import { Product } from '../../models/product'

describe('ProductsServices', () => {
  const stubRepo = {
    createProduct: vi.fn(),
    getAllProducts: vi.fn(),
    sellProduct: vi.fn(),
    searchProducts: vi.fn(),
    bulkPriceUpdate: vi.fn()
  }

  const services = new ProductsServices(stubRepo as any)

  it('forwards createProduct to repository', async () => {
    const p: Product = { id: '1', name: 'X', sku: 'S1', price: 1, stock: 1, category: 'Food', createdAt: new Date().toISOString() }
    stubRepo.createProduct.mockResolvedValue(p)
    const result = await services.createProduct(p)
    expect(result).toEqual(p)
  })

  it('forwards getProducts to repository', async () => {
    const arr: Product[] = []
    stubRepo.getAllProducts.mockResolvedValue(arr)
    const res = await services.getProducts('Food')
    expect(res).toBe(arr)
  })

  it('forwards sell/search/bulk update to repository', async () => {
    stubRepo.sellProduct.mockResolvedValue({} as Product)
    stubRepo.searchProducts.mockResolvedValue([])
    stubRepo.bulkPriceUpdate.mockResolvedValue([])
    await services.sellProduct('1')
    await services.searchProducts('q')
    await services.bulkPriceUpdate([{ id: 1, newPrice: 2 }])
    expect(stubRepo.sellProduct).toHaveBeenCalled()
    expect(stubRepo.searchProducts).toHaveBeenCalled()
    expect(stubRepo.bulkPriceUpdate).toHaveBeenCalled()
  })
})
