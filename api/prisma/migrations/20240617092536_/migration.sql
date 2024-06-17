-- AlterTable
ALTER TABLE "freight_information" ALTER COLUMN "departure_time" DROP NOT NULL,
ALTER COLUMN "arrival_time" DROP NOT NULL,
ALTER COLUMN "viewed" DROP NOT NULL,
ALTER COLUMN "viewed" SET DEFAULT false,
ALTER COLUMN "viewed_at" DROP NOT NULL;
