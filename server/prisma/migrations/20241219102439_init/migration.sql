-- CreateTable
CREATE TABLE "userModel" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userModel_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "role" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "__user_role_junction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "__user_role_junction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "userModel_email_key" ON "userModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userModel_username_key" ON "userModel"("username");

-- CreateIndex
CREATE INDEX "__user_role_junction_B_index" ON "__user_role_junction"("B");

-- AddForeignKey
ALTER TABLE "__user_role_junction" ADD CONSTRAINT "__user_role_junction_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__user_role_junction" ADD CONSTRAINT "__user_role_junction_B_fkey" FOREIGN KEY ("B") REFERENCES "userModel"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
