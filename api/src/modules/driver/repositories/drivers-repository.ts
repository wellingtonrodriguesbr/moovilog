import { Driver, Prisma } from "@prisma/client";

export interface DriversRepository {
	create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>;
	findByDocumentNumber(documentNumber: string): Promise<Driver | null>;
	findByPhoneNumberInCompany(
		phone: string,
		companyId: string
	): Promise<Driver | null>;
	findDriverInCompany(
		documentNumber: string,
		companyId: string
	): Promise<Driver | null>;
	findById(id: string): Promise<Driver | null>;
	findManyByCompanyId(companyId: string): Promise<Driver[]>;
	deleteById(id: string): Promise<void>;
}
