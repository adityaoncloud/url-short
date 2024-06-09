-- CreateTable
CREATE TABLE "URL" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortened_key" ON "URL"("shortened");
