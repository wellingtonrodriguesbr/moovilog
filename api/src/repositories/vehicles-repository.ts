import { Prisma, Vehicle } from "@prisma/client";

export interface VehiclesRepository {
	create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>;
	findByPlate(plate: string): Promise<Vehicle | null>;
	findById(id: string): Promise<Vehicle | null>;
}
