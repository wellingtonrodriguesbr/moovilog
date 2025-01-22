import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
	async create(data: Prisma.CompanyUncheckedCreateInput) {
		const company = await prisma.company.create({
			data,
		});

		return company;
	}

	async findById(id: string) {
		const company = await prisma.company.findFirst({
			where: {
				id,
			},
		});

		if (!company) {
			return null;
		}

		return company;
	}

	async findByDocumentNumber(documentNumber: string) {
		const company = await prisma.company.findUnique({
			where: {
				documentNumber,
			},
		});

		if (!company) {
			return null;
		}

		return company;
	}

	async findByOwnerId(ownerId: string) {
		const company = await prisma.company.findUnique({
			where: {
				ownerId,
			},
		});

		if (!company) {
			return null;
		}

		return company;
	}

	async setCompanyAddress(companyId: string, addressId: string) {
		await prisma.company.update({
			where: {
				id: companyId,
			},
			data: {
				addressId,
			},
		});
	}
}
