-- DropForeignKey
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
