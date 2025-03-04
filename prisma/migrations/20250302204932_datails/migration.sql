/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CategoriesID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreationDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImageURL` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `ProductID` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RegisterDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RolID` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `UserID` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "stock",
ADD COLUMN     "CategoriesID" TEXT NOT NULL,
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "ImageURL" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ProductID" TEXT NOT NULL,
ADD COLUMN     "Stock" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductID");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "Phone" TEXT NOT NULL,
ADD COLUMN     "RegisterDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "RolID" TEXT NOT NULL,
ADD COLUMN     "UserID" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserID");

-- CreateTable
CREATE TABLE "Rol" (
    "RolID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("RolID")
);

-- CreateTable
CREATE TABLE "Option" (
    "OptionID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("OptionID")
);

-- CreateTable
CREATE TABLE "OptionValue" (
    "ValueID" TEXT NOT NULL,
    "OptionID" TEXT NOT NULL,
    "Value" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionValue_pkey" PRIMARY KEY ("ValueID")
);

-- CreateTable
CREATE TABLE "Variant" (
    "VariantID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Stock" INTEGER NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("VariantID")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "VariantID" TEXT NOT NULL,
    "OptionValueID" TEXT NOT NULL,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("VariantID","OptionValueID")
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "InventoryID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "InitialStock" INTEGER NOT NULL,
    "Entries" INTEGER NOT NULL,
    "Exits" INTEGER NOT NULL,
    "EndStock" INTEGER NOT NULL,
    "UpdateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("InventoryID")
);

-- CreateTable
CREATE TABLE "ViewedProduct" (
    "ViewedID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "ViewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ViewedProduct_pkey" PRIMARY KEY ("ViewedID")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "ReviewID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Qualification" INTEGER NOT NULL,
    "Comment" TEXT NOT NULL,
    "ReviewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "CartID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("CartID")
);

-- CreateTable
CREATE TABLE "CartDetail" (
    "CartDetailID" TEXT NOT NULL,
    "CartID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CartDetail_pkey" PRIMARY KEY ("CartDetailID")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "OrderDetailID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("OrderDetailID")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "PaymentMethodID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("PaymentMethodID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "PaymentMethodID" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "PaymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentID")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "AddressID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "ZipCode" TEXT NOT NULL,
    "Country" TEXT NOT NULL,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("AddressID")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "CouponID" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Discount" DOUBLE PRECISION NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "MinimumPurchase" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("CouponID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_Name_key" ON "Rol"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_UserID_key" ON "Cart"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_Code_key" ON "Coupon"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RolID_fkey" FOREIGN KEY ("RolID") REFERENCES "Rol"("RolID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CategoriesID_fkey" FOREIGN KEY ("CategoriesID") REFERENCES "Category"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionValue" ADD CONSTRAINT "OptionValue_OptionID_fkey" FOREIGN KEY ("OptionID") REFERENCES "Option"("OptionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_VariantID_fkey" FOREIGN KEY ("VariantID") REFERENCES "Variant"("VariantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_OptionValueID_fkey" FOREIGN KEY ("OptionValueID") REFERENCES "OptionValue"("ValueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewedProduct" ADD CONSTRAINT "ViewedProduct_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewedProduct" ADD CONSTRAINT "ViewedProduct_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES "Cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Variant"("VariantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Variant"("VariantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_PaymentMethodID_fkey" FOREIGN KEY ("PaymentMethodID") REFERENCES "PaymentMethod"("PaymentMethodID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
