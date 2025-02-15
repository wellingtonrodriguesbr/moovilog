import { FinanceTransaction, Prisma } from "@prisma/client";

export interface FinanceTransactionsRepository {
	create(
		data: Prisma.FinanceTransactionUncheckedCreateInput
	): Promise<FinanceTransaction>;
	findManyByCompanyId(companyId: string): Promise<FinanceTransaction[]>;
	countByCompanyId(companyId: string): Promise<number>;
	sumByTypeAndCompanyId(
		type: "INCOME" | "EXPENSE",
		companyId: string
	): Promise<number>;
}
