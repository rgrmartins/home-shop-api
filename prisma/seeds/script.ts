import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const product1 = await prisma.product.createMany({
    data: [
      {
        name: 'Loveseat Sofa',
        price: 1500,
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHVjr6m9IxU2hh1YjWOelaKeRtdiZlyANqIHgKpsKVio_u5u_-WJuEtPNQ2HQ9gNcoA&usqp=CAU',
        stars: 4,
        color: 'orange'
      },
      {
        name: 'Kit Cups',
        price: 49.90,
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyFAqTZ5_E2G9RRgBs_KHcVKGoeoiPdBVp4h3qgSUGQ&s',
        stars: 1,
        color: 'white',
        isNew: true,
      },
      {
        name: 'Little Table',
        price: 150,
        imgUrl: 'https://m.media-amazon.com/images/I/51uQA4wE0AL.jpg',
        stars: 2,
        color: 'Black',
        isSale: true,
        discountValue: 30,
        oldPrice: 800
      },
      {
        name: 'Luxury Bed',
        price: 2500,
        imgUrl: 'https://st.hzcdn.com/simgs/pictures/bedrooms/luxury-furniture-classic-home-products-ltd-part-img~552104d6095590b5_4-7258-1-c3188a2.jpg',
        stars: 5,
        color: 'gold',
        isNew: true,
      },
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })