-- CreateTable
CREATE TABLE `users` (
    `id_User` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id_account` VARCHAR(191) NOT NULL,
    `balance` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `transactionId_Transaction` VARCHAR(191) NULL,

    UNIQUE INDEX `account_userId_key`(`userId`),
    PRIMARY KEY (`id_account`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id_Transaction` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `debitedAccount` VARCHAR(191) NOT NULL,
    `creditedAccount` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `transaction_debitedAccount_key`(`debitedAccount`),
    UNIQUE INDEX `transaction_creditedAccount_key`(`creditedAccount`),
    PRIMARY KEY (`id_Transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_transactionId_Transaction_fkey` FOREIGN KEY (`transactionId_Transaction`) REFERENCES `transaction`(`id_Transaction`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_debitedAccount_fkey` FOREIGN KEY (`debitedAccount`) REFERENCES `account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_creditedAccount_fkey` FOREIGN KEY (`creditedAccount`) REFERENCES `account`(`id_account`) ON DELETE RESTRICT ON UPDATE CASCADE;
