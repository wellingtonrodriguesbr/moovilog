import { Prisma, Vehicle, VehicleStatus } from "@prisma/client";

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
	updateStatus(id: string, status: VehicleStatus): Promise<void>;
	update(
		vehicleId: string,
		data: Prisma.VehicleUncheckedUpdateInput
	): Promise<void>;
}
