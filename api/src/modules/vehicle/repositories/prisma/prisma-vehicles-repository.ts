import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";

export class PrismaVehiclesRepository implements VehiclesRepository {
	async create(data: Prisma.VehicleUncheckedCreateInput) {
		const vehicle = await prisma.vehicle.create({
			data,
		});

		return vehicle;
	}

	async findVehicleInCompany(plate: string, companyId: string) {
		const member = await prisma.vehicle.findUnique({
			where: {
				plate_companyId: {
					plate,
					companyId,
				},
			},
		});

		if (!member) {
			return null;
		}

		return member;
	}

	async findByPlate(plate: string) {
		const vehicle = await prisma.vehicle.findUnique({
			where: {
				plate,
			},
		});

		if (!vehicle) {
			return null;
		}

		return vehicle;
	}

	async findById(id: string) {
		const vehicle = await prisma.vehicle.findUnique({
			where: {
				id,
			},
		});

		if (!vehicle) {
			return null;
		}

		return vehicle;
	}

	async findManyByCompanyId(companyId: string) {
		const vehicles = await prisma.vehicle.findMany({
			where: {
				companyId,
			},
		});

		return vehicles;
	}
}
