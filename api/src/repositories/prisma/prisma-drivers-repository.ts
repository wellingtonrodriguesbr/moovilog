import { prisma } from "@/lib/prisma";
import { DriversRepository } from "../drivers-repository";
import { Prisma } from "@prisma/client";

export class PrismaDriversRepository implements DriversRepository {
	async create(data: Prisma.DriverUncheckedCreateInput) {
		const driver = await prisma.driver.create({
			data: {
				...data,
				companyDrivers: {
					create: {
						companyId: data.companyId,
					},
				},
			},
		});

		return driver;
	}

	async findByDocumentNumber(documentNumber: string) {
		const driver = await prisma.driver.findUnique({
			where: {
				documentNumber,
			},
		});

		if (!driver) {
			return null;
		}

		return driver;
	}

	async findById(id: string) {
		const driver = await prisma.driver.findUnique({
			where: {
				id,
			},
		});

		if (!driver) {
			return null;
		}

		return driver;
	}
}
