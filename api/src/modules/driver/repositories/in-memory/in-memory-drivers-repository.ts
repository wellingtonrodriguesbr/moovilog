import { Driver, Prisma } from "@prisma/client";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { randomUUID } from "node:crypto";

export class InMemoryDriversRepository implements DriversRepository {
	public items: Driver[] = [];

	async create(data: Prisma.DriverUncheckedCreateInput) {
		const driver = {
			companyId: data.companyId,
			creatorId: data.creatorId,
			id: data.id ?? randomUUID(),
			name: data.name,
			documentNumber: data.documentNumber,
			phone: data.phone,
			type: data.type,
			status: data.status ?? "ACTIVE",
			addressId: data.addressId ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		};

		this.items.push(driver);
		return driver;
	}

	async findDriverInCompany(documentNumber: string, companyId: string) {
		const driver = this.items.find(
			(item) =>
				item.documentNumber === documentNumber && item.companyId === companyId
		);

		if (!driver) {
			return null;
		}

		return driver;
	}

	async findByDocumentNumber(documentNumber: string) {
		const driver = this.items.find(
			(item) => item.documentNumber === documentNumber
		);

		if (!driver) {
			return null;
		}

		return driver;
	}

	async findById(id: string) {
		const driver = this.items.find((item) => item.id === id);

		if (!driver) {
			return null;
		}

		return driver;
	}

	async findManyByCompanyId(companyId: string) {
		const drivers = this.items.filter((item) => item.companyId === companyId);

		return drivers;
	}

	async deleteById(id: string) {
		const driverIndex = this.items.findIndex((item) => item.id !== id);

		this.items[driverIndex].deletedAt = new Date();
	}
}
