import { Prisma, Vehicle } from "@prisma/client";

export interface VehiclesRepository {
	create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>;
	findByPlate(plate: string): Promise<Vehicle | null>;
	findVehicleInCompanyByPlate(
		plate: string,
		companyId: string
	): Promise<Vehicle | null>;
	findVehicleInCompanyByTrailerPlate(
		trailerPlate: string,
		companyId: string
	): Promise<Vehicle | null>;
	findById(id: string): Promise<Vehicle | null>;
	findVehicleInCompany(id: string, companyId: string): Promise<Vehicle | null>;
	findManyByCompanyId(companyId: string): Promise<Vehicle[]>;
	deleteById(id: string): Promise<void>;
}
