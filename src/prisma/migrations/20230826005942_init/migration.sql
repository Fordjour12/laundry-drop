-- CreateEnum
CREATE TYPE "Validaiton" AS ENUM ('NOT_VALID', 'VALID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "usename" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account_state" "Validaiton" NOT NULL DEFAULT 'NOT_VALID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
