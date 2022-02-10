-- CreateTable
CREATE TABLE "Year" (
    "number" INTEGER NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" SERIAL NOT NULL,
    "yearNum" INTEGER NOT NULL,
    "Monday" JSONB NOT NULL,
    "Tuesday" JSONB NOT NULL,
    "Wednesday" JSONB NOT NULL,
    "Thursday" JSONB NOT NULL,
    "Friday" JSONB NOT NULL,
    "Satday" JSONB NOT NULL,
    "Sunday" JSONB NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_yearNum_fkey" FOREIGN KEY ("yearNum") REFERENCES "Year"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
