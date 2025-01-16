import { Prisma } from "@prisma/client";

export interface CompanyStatesAreasRepository {
	createMany(
		data: Prisma.CompanyStateAreaUncheckedCreateInput[]
	): Promise<void>;
}
