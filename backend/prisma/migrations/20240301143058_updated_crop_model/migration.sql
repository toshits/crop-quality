/*
  Warnings:

  - A unique constraint covering the columns `[iconUrl]` on the table `Crops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `iconUrl` to the `Crops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `crops` ADD COLUMN `iconUrl` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Crops_iconUrl_key` ON `Crops`(`iconUrl`);
