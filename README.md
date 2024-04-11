# Home Shop - API

💫 Welcome! 🎉

This backend is responsible to building a Node.js/Express.js app that will serve a REST API.

## Technologies
- NodeJS
- Express
- Typescript
- Prisma ORM
- SQLite
- Jest
- Zod
- Typescript

## Data Models

> **All models are defined in ./prisma/schema.prisma**

### Products

A product has its attributes defined, such as price, name, url image, etc.

## Getting Set Up

The API requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Copy and Paste `.env.example` and rename to `.env`

1. In the repo root directory, run `pnpm install` to gather all dependencies.

1. Next, run `pnpm migrations` will run migrations and create if don't exists the file database.sqlite3, our local database.

1. Next, `pnpm seed` will run seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `./prisma/database.sqlite3`.

1. Then run `pnpm dev` which should start the server.

## Tests
1. Is necessary run before the migrations and seed command.

1. To run the tests, run the `pnpm test` command

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`.

- The server is running on port 3000, defined in `.env`.

## Endpoints APIs

Below is a list of the endpoints of the application.

1. **_GET_** `/` - Health Check of application

1. **_GET_** `/products` -  Returns a list of products.

1. **_GET_** `/product/:id` - Return specific product.

1. **_POST_** `/new-product` - Responsible for insert a new product in database. Exists validation with `Zod`, the body should be seems of example below, but exists other attributes that you can use, such as oldPrice and isSale if the product is on sale.

- Example of body request:
```
{
    "name": "Bathroom Sink",
    "price": 200.99,
    "imgUrl": "https://i5.walmartimages.com/seo/Better-Homes-Gardens-24-1-2-L-x-18-7-8-W-Green-Bathroom-Vanity-with-Sink-Top_4a0f1e76-9f65-4252-9ad0-08e7b67a920f.321dd9848e2c8baec4d886416324cc64.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    "stars": 4,
    "color": "green",
    "isNew": true
}
```

1. **_DELETE_** `/delete-product/:id` - Responsible for delete a product from database.

## Thank You
