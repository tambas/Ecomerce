-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "product" (
    "ProductId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Description" TEXT,
    "Price" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "Store" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "subatCagoryId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "cart" (
    "cartId" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createAt" INTEGER,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_deliveredn" BOOLEAN NOT NULL DEFAULT false,
    "ProductId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCatagory" (
    "subatCagoryId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'https://unsplash.com/photos/1SAnrIxw5OY',
    "CagoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "subCatagory_pkey" PRIMARY KEY ("subatCagoryId")
);

-- CreateTable
CREATE TABLE "catagory" (
    "CagoryId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "catagory_pkey" PRIMARY KEY ("CagoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subatCagoryId_fkey" FOREIGN KEY ("subatCagoryId") REFERENCES "subCatagory"("subatCagoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "product"("ProductId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "product"("ProductId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subCatagory" ADD CONSTRAINT "subCatagory_CagoryId_fkey" FOREIGN KEY ("CagoryId") REFERENCES "catagory"("CagoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subCatagory" ADD CONSTRAINT "subCatagory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catagory" ADD CONSTRAINT "catagory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
