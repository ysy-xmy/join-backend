/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[schoolId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduce` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinReason` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "appendix" TEXT,
ADD COLUMN     "gender" INTEGER NOT NULL,
ADD COLUMN     "introduce" TEXT NOT NULL,
ADD COLUMN     "joinReason" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "schoolId" TEXT NOT NULL,
ADD COLUMN     "skill" INTEGER NOT NULL,
ADD COLUMN     "skillAddition" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL;

-- DropTable
DROP TABLE "bookmarks";

-- CreateIndex
CREATE UNIQUE INDEX "users_schoolId_key" ON "users"("schoolId");
