import { Company, Prisma } from "@prisma/client";

export interface CompaniesRepository {
	create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>;
	setCompanyAddress(companyId: string, addressId: string): Promise<void>;
	findById(id: string): Promise<Company | null>;
	findByDocumentNumber(documentNumber: string): Promise<Company | null>;
	findByOwnerId(ownerId: string): Promise<Company | null>;
}
