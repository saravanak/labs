-- CreateTable
CREATE TABLE "shelves" (
    "id" SERIAL NOT NULL,
    "shortName" TEXT NOT NULL,
    "rackId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "shelves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "racks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "racks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "luggages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "type" TEXT NOT NULL,
    "length" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "shelfId" INTEGER NOT NULL,

    CONSTRAINT "luggages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shelves_shortName_key" ON "shelves"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "racks_shortName_key" ON "racks"("shortName");

-- AddForeignKey
ALTER TABLE "shelves" ADD CONSTRAINT "shelves_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "racks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "luggages" ADD CONSTRAINT "luggages_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "shelves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
