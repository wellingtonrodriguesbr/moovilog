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
}
