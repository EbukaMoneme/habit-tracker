/*
  Warnings:

  - You are about to drop the `Week` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Week" DROP CONSTRAINT "Week_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "status" JSONB NOT NULL;

-- DropTable
DROP TABLE "Week";
