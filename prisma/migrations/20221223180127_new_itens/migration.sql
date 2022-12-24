/*
  Warnings:

  - You are about to drop the column `valorTotal` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `qtd` on the `ItensCompra` table. All the data in the column will be lost.
  - Added the required column `totalValue` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `ItensCompra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitValue` to the `ItensCompra` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalValue" DECIMAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cart" ("id", "userId") SELECT "id", "userId" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
CREATE TABLE "new_ItensCompra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unitValue" DECIMAL NOT NULL,
    CONSTRAINT "ItensCompra_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItensCompra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItensCompra" ("cartId", "id", "productId") SELECT "cartId", "id", "productId" FROM "ItensCompra";
DROP TABLE "ItensCompra";
ALTER TABLE "new_ItensCompra" RENAME TO "ItensCompra";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
