/*
  Warnings:

  - You are about to drop the `userModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "__user_role_junction" DROP CONSTRAINT "__user_role_junction_B_fkey";

-- DropTable
DROP TABLE "userModel";

-- CreateTable
CREATE TABLE "user_model" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_model_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_model_email_key" ON "user_model"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_model_username_key" ON "user_model"("username");

-- AddForeignKey
ALTER TABLE "__user_role_junction" ADD CONSTRAINT "__user_role_junction_B_fkey" FOREIGN KEY ("B") REFERENCES "user_model"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
