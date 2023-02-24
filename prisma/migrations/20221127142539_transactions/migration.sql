/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "account" (
    "id_account" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId_Transaction" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id_account")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id_Transaction" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "debitedAccount" TEXT NOT NULL,
    "creditedAccount" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id_Transaction")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_debitedAccount_key" ON "Transaction"("debitedAccount");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_creditedAccount_key" ON "Transaction"("creditedAccount");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_transactionId_Transaction_fkey" FOREIGN KEY ("transactionId_Transaction") REFERENCES "Transaction"("id_Transaction") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_debitedAccount_fkey" FOREIGN KEY ("debitedAccount") REFERENCES "account"("id_account") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_creditedAccount_fkey" FOREIGN KEY ("creditedAccount") REFERENCES "account"("id_account") ON DELETE RESTRICT ON UPDATE CASCADE;
