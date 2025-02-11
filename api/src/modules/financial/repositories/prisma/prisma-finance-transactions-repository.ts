import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";

export class PrismaFinanceTransactionsRepository
	implements FinanceTransactionsRepository
{
	async create(data: Prisma.FinanceTransactionUncheckedCreateInput) {
		const transaction = await prisma.financeTransaction.create({
			data,
		});

		return transaction;
	}
}
