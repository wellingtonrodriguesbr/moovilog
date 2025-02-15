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

	async findManyByCompanyId(companyId: string) {
		const transactions = await prisma.financeTransaction.findMany({
			where: {
				companyId,
			},
			include: {
				category: true,
			},
		});

		return transactions;
	}

	async countByCompanyId(companyId: string) {
		const count = await prisma.financeTransaction.count({
			where: { companyId },
		});

		return count;
	}

	async sumByTypeAndCompanyId(type: "INCOME" | "EXPENSE", companyId: string) {
		const result = await prisma.financeTransaction.aggregate({
			_sum: { amountInCents: true },
			where: { type, companyId },
		});

		return result._sum.amountInCents || 0;
	}
}
