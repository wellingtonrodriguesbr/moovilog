import { Prisma, Vehicle } from "@prisma/client";
import { VehiclesRepository } from "@/repositories/vehicles-repository";
import { randomUUID } from "crypto";

export class InMemoryVehiclesRepository implements VehiclesRepository {
	public items: Vehicle[] = [];

	async create(data: Prisma.VehicleUncheckedCreateInput) {
		const vehicle = {
			id: data.id ?? randomUUID(),
			plate: data.plate,
			year: data.year,
			category: data.category,
			type: data.type,
			body: data.body,
			fullLoadCapacity: data.fullLoadCapacity,
			brand: data.brand,
			model: data.model,
			creatorId: data.creatorId,
			companyId: data.companyId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(vehicle);
		return vehicle;
	}

	async findVehicleInCompany(plate: string, companyId: string) {
		const vehicle = this.items.find(
			(item) => item.plate === plate && item.companyId === companyId
		);

		if (!vehicle) {
			return null;
		}

		return vehicle;
	}

	async findByPlate(plate: string) {
		const vehicle = this.items.find((item) => item.plate === plate);

		if (!vehicle) {
			return null;
		}

		return vehicle;
	}

	async findById(id: string) {
		const vehicle = this.items.find((item) => item.id === id);

		if (!vehicle) {
			return null;
		}

		return vehicle;
	}

	async findManyByCompanyId(companyId: string) {
		const vehicles = this.items.filter((item) => item.companyId === companyId);

		return vehicles;
	}
}
