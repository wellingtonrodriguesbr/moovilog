import { FinanceCategory, Prisma } from "@prisma/client";

export interface FinanceCategoriesRepository {
	create(
		data: Prisma.FinanceCategoryUncheckedCreateInput
	): Promise<FinanceCategory>;
	findByName(name: string): Promise<FinanceCategory | null>;
}
