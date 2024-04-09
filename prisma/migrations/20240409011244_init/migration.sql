-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "oldPrice" DECIMAL,
    "imgUrl" TEXT NOT NULL,
    "discountValue" INTEGER,
    "stars" INTEGER,
    "color" TEXT,
    "isNew" BOOLEAN DEFAULT false,
    "isSale" BOOLEAN DEFAULT false
);
