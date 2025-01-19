import { CompanyStateArea, Prisma } from "@prisma/client";

export interface CompanyStatesAreasRepository {
	createMany(
		data: Prisma.CompanyStateAreaUncheckedCreateInput[]
	): Promise<void>;
	create(
		data: Prisma.CompanyStateAreaUncheckedCreateInput
	): Promise<CompanyStateArea>;
	findManyByCompanyId(companyId: string): Promise<CompanyStateArea[]>;
}
