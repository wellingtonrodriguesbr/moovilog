import { Driver, Prisma } from "@prisma/client";
import { DriversRepository } from "../drivers-repository";
import { randomUUID } from "crypto";

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
}
