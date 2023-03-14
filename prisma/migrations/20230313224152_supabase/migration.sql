-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "authCode" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");
