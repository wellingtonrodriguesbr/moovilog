import { DriverTransaction, Prisma } from "@prisma/client";

export interface DriverTransactionsRepository {
	create(
		data: Prisma.DriverTransactionUncheckedCreateInput
	): Promise<DriverTransaction>;
}
