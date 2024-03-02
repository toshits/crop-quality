/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Crops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Crops` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `crops` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `crops` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Crops_name_key` ON `Crops`(`name`);
