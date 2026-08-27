-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'AUTHOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
