/*
  Warnings:

  - You are about to drop the column `usename` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "usename",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "LaundryProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountState" "Validaiton" NOT NULL DEFAULT 'NOT_VALID',
    "priceRange" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LaundryProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaundryProviderLoacation" (
    "id" SERIAL NOT NULL,
    "laundryProviderId" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "postAddress" TEXT NOT NULL,

    CONSTRAINT "LaundryProviderLoacation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaundryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "laundryProviderId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LaundryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LaundryProvider_id_key" ON "LaundryProvider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LaundryProvider_email_key" ON "LaundryProvider"("email");

-- AddForeignKey
ALTER TABLE "LaundryProviderLoacation" ADD CONSTRAINT "LaundryProviderLoacation_laundryProviderId_fkey" FOREIGN KEY ("laundryProviderId") REFERENCES "LaundryProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaundryItem" ADD CONSTRAINT "LaundryItem_laundryProviderId_fkey" FOREIGN KEY ("laundryProviderId") REFERENCES "LaundryProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
