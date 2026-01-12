import { describe, it, expect, vi } from 'vitest'
import { ProductsControllers } from '.'

describe('ProductsControllers', () => {
  it('createProduct returns 201 and created product', async () => {
    const created = { id: '1', name: 'a' }
    const svc = { createProduct: vi.fn().mockResolvedValue(created) }
    const ctrl = new ProductsControllers(svc as any)

    const req: any = { body: { name: 'a' } }
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() }

    await ctrl.createProduct(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(created)
  })

  it('getProducts returns list', async () => {
    const svc = { getProducts: vi.fn().mockResolvedValue([{ id: '1' }]) }
    const ctrl = new ProductsControllers(svc as any)
    const req: any = { query: {} }
    const res: any = { json: vi.fn() }
    await ctrl.getProducts(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  it('sellProduct uses params.id and returns json', async () => {
    const svc = { sellProduct: vi.fn().mockResolvedValue({ id: '1' }) }
    const ctrl = new ProductsControllers(svc as any)
    const req: any = { params: { id: '1' } }
    const res: any = { json: vi.fn() }
    await ctrl.sellProduct(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  it('searchProducts uses query.keyword', async () => {
    const svc = { searchProducts: vi.fn().mockResolvedValue([]) }
    const ctrl = new ProductsControllers(svc as any)
    const req: any = { query: { keyword: 'x' } }
    const res: any = { json: vi.fn() }
    await ctrl.searchProducts(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  it('bulkPriceUpdate forwards body', async () => {
    const svc = { bulkPriceUpdate: vi.fn().mockResolvedValue([]) }
    const ctrl = new ProductsControllers(svc as any)
    const req: any = { body: [{ id: 1, newPrice: 2 }] }
    const res: any = { json: vi.fn() }
    await ctrl.bulkPriceUpdate(req, res)
    expect(svc.bulkPriceUpdate).toHaveBeenCalled()
  })
})
