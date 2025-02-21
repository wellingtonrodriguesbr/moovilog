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

		return driver;
	}

	async findByPhoneNumberInCompany(phone: string, companyId: string) {
		const driver = await prisma.driver.findUnique({
			where: {
				phone_companyId: {
					phone,
					companyId,
				},
			},
		});

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

		return driver;
	}

	async findById(id: string) {
		const driver = await prisma.driver.findUnique({
			where: {
				id,
			},
		});

		return driver;
	}

	async findManyByCompanyId(companyId: string) {
		const drivers = await prisma.driver.findMany({
			where: {
				companyId,
			},
		});

		return drivers;
	}

	async deleteById(id: string) {
		await prisma.driver.delete({
			where: {
				id,
			},
		});
	}
}
