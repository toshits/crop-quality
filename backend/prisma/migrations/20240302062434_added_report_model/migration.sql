-- CreateTable
CREATE TABLE `Reports` (
    `id` VARCHAR(191) NOT NULL,
    `cropImageUrl` VARCHAR(191) NOT NULL,
    `reportPdfUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `cropsId` INTEGER NOT NULL,

    UNIQUE INDEX `Reports_cropImageUrl_key`(`cropImageUrl`),
    UNIQUE INDEX `Reports_reportPdfUrl_key`(`reportPdfUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reports` ADD CONSTRAINT `Reports_cropsId_fkey` FOREIGN KEY (`cropsId`) REFERENCES `Crops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
