import { describe, it, expect } from 'vitest'
import { ProductsRepository } from '.'
import { Product } from '../../models/product'

describe('ProductsRepository', () => {
  const makeProduct = (overrides: Partial<Product> = {}): Product => ({
    id: (Math.random()*1000).toFixed(0),
    name: 'Test',
    sku: `SKU-${Math.random().toFixed(4)}`,
    price: 10,
    stock: 5,
    category: 'Food',
    createdAt: new Date().toISOString(),
    ...overrides
  })

  it('creates a product and returns it', async () => {
    const repo = new ProductsRepository()
    const p = makeProduct()
    const created = await repo.createProduct(p)
    expect(created).toEqual(p)
  })

  it('rejects creating a product with duplicate SKU', async () => {
    const repo = new ProductsRepository()
    const p = makeProduct({ sku: 'DUP-1' })
    await repo.createProduct(p)
    await expect(repo.createProduct({ ...makeProduct(), sku: 'DUP-1' })).rejects.toThrow()
  })

  it('filters getAllProducts by category', async () => {
    const repo = new ProductsRepository()
    await repo.createProduct(makeProduct({ category: 'Food' }))
    await repo.createProduct(makeProduct({ category: 'Beverages' }))
    const foods = await repo.getAllProducts('Food')
    expect(foods.every(f => f.category === 'Food')).toBe(true)
  })

  it('sellProduct decreases stock and errors when out of stock or not found', async () => {
    const repo = new ProductsRepository()
    const p = makeProduct({ stock: 1 })
    await repo.createProduct(p)
    const sold = await repo.sellProduct(p.id)
    expect(sold.stock).toBe(0)
    await expect(repo.sellProduct(p.id)).rejects.toThrow(/out of stock/i)
    await expect(repo.sellProduct('nope')).rejects.toThrow(/not found/i)
  })

  it('searchProducts finds by name or sku', async () => {
    const repo = new ProductsRepository()
    const p = makeProduct({ name: 'Fried Rice', sku: 'FR-01' })
    await repo.createProduct(p)
    const res1 = await repo.searchProducts('fried')
    const res2 = await repo.searchProducts('FR-0')
    expect(res1.length).toBeGreaterThan(0)
    expect(res2.length).toBeGreaterThan(0)
  })

  it('updateProductPrice and bulkPriceUpdate behave correctly', async () => {
    const repo = new ProductsRepository()
    const p1 = makeProduct({ id: '1' })
    const p2 = makeProduct({ id: '2' })
    await repo.createProduct(p1)
    await repo.createProduct(p2)
    const updated = await repo.updateProductPrice(1, 99)
    expect(updated).toHaveProperty('price', 99)
    const bulk = await repo.bulkPriceUpdate([{ id: 1, newPrice: 11 }, { id: 2, newPrice: 12 }])
    expect(bulk.length).toBeGreaterThanOrEqual(1)
  })
})
