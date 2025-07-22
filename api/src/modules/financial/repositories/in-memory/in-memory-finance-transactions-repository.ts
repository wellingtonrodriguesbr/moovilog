import { FinanceTransaction, Prisma } from "@prisma/client";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { randomUUID } from "node:crypto";

export class InMemoryFinanceTransactionsRepository implements FinanceTransactionsRepository {
  public items: FinanceTransaction[] = [];

  async create(data: Prisma.FinanceTransactionUncheckedCreateInput): Promise<FinanceTransaction> {
    const transaction = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      amountInCents: data.amountInCents,
      status: data.status,
      paymentMethod: data.paymentMethod ?? null,
      type: data.type,
      categoryId: data.categoryId,
      creatorId: data.creatorId ?? null,
      companyId: data.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(transaction);
    return transaction;
  }

  async findManyByCompanyId(companyId: string) {
    const transactions = this.items.filter((transaction) => transaction.companyId === companyId);

    return transactions;
  }

  async countByCompanyId(companyId: string) {
    return this.items.filter((transaction) => transaction.companyId === companyId).length;
  }

  async sumByTypeAndCompanyId(type: "INCOME" | "EXPENSE", companyId: string) {
    return this.items
      .filter((transaction) => transaction.type === type)
      .filter((transaction) => transaction.companyId === companyId)
      .reduce((acc, transaction) => acc + transaction.amountInCents, 0);
  }
}
