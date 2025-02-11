import { FinanceTransaction, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";

export class InMemoryFinanceTransactionsRepository
	implements FinanceTransactionsRepository
{
	public items: FinanceTransaction[] = [];

	async create(
		data: Prisma.FinanceTransactionUncheckedCreateInput
	): Promise<FinanceTransaction> {
		const transaction = {
			id: data.id ?? randomUUID(),
			description: data.description ?? null,
			date: new Date(data.date),
			dueDate: data.dueDate ? new Date(data.dueDate) : null,
			amountInCents: data.amountInCents,
			status: data.status,
			paymentMethod: data.paymentMethod ?? null,
			type: data.type,
			categoryId: data.categoryId,
			creatorId: data.creatorId,
			companyId: data.companyId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(transaction);
		return transaction;
	}
}
