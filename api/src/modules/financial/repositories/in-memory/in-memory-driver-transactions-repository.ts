import { DriverTransaction, Prisma } from "@prisma/client";
import { DriverTransactionsRepository } from "@/modules/financial/repositories/driver-transactions-repository";
import { randomUUID } from "node:crypto";

export class InMemoryDriverTransactionsRepository implements DriverTransactionsRepository {
  public items: DriverTransaction[] = [];

  async create(data: Prisma.DriverTransactionUncheckedCreateInput) {
    const driverTransaction = {
      id: data.id ?? randomUUID(),
      driverId: data.driverId,
      financeTransactionId: data.financeTransactionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(driverTransaction);
    return driverTransaction;
  }
}
