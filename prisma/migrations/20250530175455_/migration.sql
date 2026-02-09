-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "info_gathered" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);
