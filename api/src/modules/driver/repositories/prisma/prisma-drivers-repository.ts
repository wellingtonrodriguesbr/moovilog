import { Prisma, AccountStatus } from "@prisma/client";
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
		const driver = await prisma.driver.findFirst({
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
			orderBy: {
				createdAt: "asc",
			},
		});

		return drivers;
	}

	async updateStatus(id: string, status: AccountStatus) {
		await prisma.driver.update({
			where: {
				id,
			},
			data: {
				status,
			},
		});
	}

	async update(id: string, data: Prisma.DriverUncheckedUpdateInput) {
		await prisma.driver.update({
			where: {
				id,
			},
			data,
		});
	}
}
