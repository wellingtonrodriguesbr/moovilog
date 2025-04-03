import { FreightTransaction, Prisma } from "@prisma/client";

export interface FreightTransactionsRepository {
	create(
		data: Prisma.FreightTransactionUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	): Promise<FreightTransaction>;
}
