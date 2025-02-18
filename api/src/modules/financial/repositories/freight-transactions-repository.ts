import { FreightTransaction, Prisma } from "@prisma/client";

export interface FreightTransactionsRepository {
	create(
		data: Prisma.FreightTransactionUncheckedCreateInput
	): Promise<FreightTransaction>;
}
