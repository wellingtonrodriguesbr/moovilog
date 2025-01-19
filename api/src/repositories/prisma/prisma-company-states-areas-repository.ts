import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyStatesAreasRepository } from "@/repositories/company-states-areas-repository";

export class PrismaCompanyStatesAreasRepository
	implements CompanyStatesAreasRepository
{
	async createMany(data: Prisma.CompanyStateAreaUncheckedCreateInput[]) {
		await prisma.companyStateArea.createMany({
			data,
			skipDuplicates: true,
		});
	}

	async create(data: Prisma.CompanyStateAreaUncheckedCreateInput) {
		const companyStateArea = await prisma.companyStateArea.create({
			data,
		});

		return companyStateArea;
	}

	async findManyByCompanyId(companyId: string) {
		const companyStatesAreas = await prisma.companyStateArea.findMany({
			where: {
				companyId,
			},
		});

		return companyStatesAreas;
	}
}
