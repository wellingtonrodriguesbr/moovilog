import { DriverTransaction, Prisma } from "@prisma/client";

export interface DriverTransactionsRepository {
	create(
		data: Prisma.DriverTransactionUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	): Promise<DriverTransaction>;
}
