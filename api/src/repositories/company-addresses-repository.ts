import { CompanyAddress, Prisma } from "@prisma/client";

export interface CompanyAddressesRepository {
	create(
		data: Prisma.CompanyAddressUncheckedCreateInput
	): Promise<CompanyAddress>;
	findByCompanyId(companyId: string): Promise<CompanyAddress | null>;
}
