/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ALTER COLUMN "appendix" SET DEFAULT E'',
ALTER COLUMN "gender" SET DEFAULT -1,
ALTER COLUMN "introduce" SET DEFAULT E'',
ALTER COLUMN "joinReason" SET DEFAULT E'',
ALTER COLUMN "phone" SET DEFAULT E'',
ALTER COLUMN "schoolId" SET DEFAULT E'',
ALTER COLUMN "skill" SET DEFAULT -1,
ALTER COLUMN "skillAddition" SET DEFAULT E'',
ALTER COLUMN "status" SET DEFAULT -1,
ALTER COLUMN "name" SET DEFAULT E'';
