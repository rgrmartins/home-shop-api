import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
import { z } from 'zod'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const prisma = new PrismaClient()

app.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).send({ message: 'Server Running', date: new Date() })
})

app.get('/products', async (req: express.Request, res: express.Response) => {
  const products = await prisma.product.findMany()
  return res.status(200).send(products)
})

const newProductSchema = z.object({
  name: z.string().max(100),
  price: z.number().multipleOf(0.01),
  oldPrice: z.number().multipleOf(0.01).optional(),
  imgUrl: z.string(),
  discountValue: z.number().optional(),
  stars: z.number().positive().gte(0).lte(5),
  color: z.string().optional(),
  isNew: z.boolean().optional(),
  isSale: z.boolean().optional(),
})

app.post(
  '/new-product',
  async (req: express.Request, res: express.Response) => {
    try {
      const body = req.body

      newProductSchema.parse(body)
      const product = await prisma.product.create({
        data: {
          ...body,
        },
      })
      return res
        .status(200)
        .send({ message: 'Product Added successfully', data: product })
    } catch (error) {
      const errors = []
      for (const issue of error.issues) {
        errors.push({
          path: issue.path.join('.'),
          message: issue.message,
        })

        res.status(400).send({
          message: 'Validation Error',
          errors,
        })
      }
    }
  },
)

app.delete(
  '/delete-product/:id',
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    })
    return res.status(200).send({ message: 'Product Deleted successfully' })
  },
)

app.get('/product/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!product) {
    return res.status(404).send({ message: 'Product not found' })
  }

  return res.status(200).send(product)
})

try {
  app.listen(port, async () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`)
  })
} catch (error) {
  console.log(`Error ocurred ${(error as Error).message}`)
}
