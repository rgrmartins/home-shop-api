import request from 'supertest'

import app from './server'

describe('Server API', () => {
  let server

  beforeAll(async () => {
    server = await app.listen()
  })

  afterAll(async () => {
    await server.close()
  })

  it('GET / should return a success response with a message and date', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
  })

  it('GET /products should return a list of products', async () => {
    const response = await request(app).get('/products')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('GET /products with a category query parameter should filter products', async () => {
    const category = 'Living Room'
    const response = await request(app).get(`/products?category=${category}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(
      response.body.every((product) => product.category === category),
    ).toBe(true)
  })

  it('GET /products with orderPrice=asc should sort products by price ascending', async () => {
    const response = await request(app).get(`/products?orderPrice=asc`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(
      Number(response.body[0].price) <= Number(response.body[1].price),
    ).toBe(true)
  })

  it('GET /products with invalid orderPrice should return a 400 error', async () => {
    const response = await request(app).get(`/products?orderPrice=invalid`)

    expect(response.status).toBe(400)
    expect(response.body?.message).toBe('Invalid orderPrice parameter')
  })

  it('POST /new-product with valid data should create a new product and return a 201 response', async () => {
    const newProductData = {
      name: 'New Product',
      price: 9.99,
      imgUrl: 'https://example.com/image.jpg',
    }

    const response = await request(app)
      .post('/new-product')
      .send(newProductData)

    expect(response.status).toBe(201)
  })
})
