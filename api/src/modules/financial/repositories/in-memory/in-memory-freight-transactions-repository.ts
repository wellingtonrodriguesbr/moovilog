import { FreightTransaction, Prisma } from "@prisma/client";
import { FreightTransactionsRepository } from "@/modules/financial/repositories/freight-transactions-repository";
import { randomUUID } from "node:crypto";

export class InMemoryFreightTransactionsRepository implements FreightTransactionsRepository {
  public items: FreightTransaction[] = [];

  async create(data: Prisma.FreightTransactionUncheckedCreateInput) {
    const freightTransaction = {
      id: data.id ?? randomUUID(),
      freightId: data.freightId,
      financeTransactionId: data.financeTransactionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(freightTransaction);
    return freightTransaction;
  }
}
