/*
  Warnings:

  - A unique constraint covering the columns `[user_id,space_id]` on the table `user_space` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "is_system_space" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "user_space_user_id_space_id_key" ON "user_space"("user_id", "space_id");
