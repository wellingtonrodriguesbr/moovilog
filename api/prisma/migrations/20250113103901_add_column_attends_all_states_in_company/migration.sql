-- CreateTable
CREATE TABLE "company_states_areas" (
    "id" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,

    CONSTRAINT "company_states_areas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_states_areas" ADD CONSTRAINT "company_states_areas_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_states_areas" ADD CONSTRAINT "company_states_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
