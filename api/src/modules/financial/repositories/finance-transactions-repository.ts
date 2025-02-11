import { FinanceTransaction, Prisma } from "@prisma/client";

export interface FinanceTransactionsRepository {
	create(
		data: Prisma.FinanceTransactionUncheckedCreateInput
	): Promise<FinanceTransaction>;
}
