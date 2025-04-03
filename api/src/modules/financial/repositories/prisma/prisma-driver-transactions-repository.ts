import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DriverTransactionsRepository } from "@/modules/financial/repositories/driver-transactions-repository";

export class PrismaDriverTransactionsRepository
	implements DriverTransactionsRepository
{
	async create(
		data: Prisma.DriverTransactionUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	) {
		const prismaTransaction = tx ?? prisma;
		const driverTransaction = await prismaTransaction.driverTransaction.create({
			data,
		});

		return driverTransaction;
	}
}
