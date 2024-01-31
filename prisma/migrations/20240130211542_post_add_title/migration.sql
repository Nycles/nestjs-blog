/*
  Warnings:

  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "title" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(20);
