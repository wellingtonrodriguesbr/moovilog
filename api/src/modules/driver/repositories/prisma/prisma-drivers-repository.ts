import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";

export class PrismaDriversRepository implements DriversRepository {
	async create(data: Prisma.DriverUncheckedCreateInput) {
		const driver = await prisma.driver.create({
			data: {
				...data,
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

	async findDriverInCompany(documentNumber: string, companyId: string) {
		const driver = await prisma.driver.findUnique({
			where: {
				documentNumber_companyId: {
					documentNumber,
					companyId,
				},
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

	async findManyByCompanyId(companyId: string) {
		const drivers = await prisma.driver.findMany({
			where: {
				companyId,
				deletedAt: null,
			},
		});

		return drivers;
	}

	async deleteById(id: string) {
		await prisma.driver.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
