import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FreightTransactionsRepository } from "@/modules/financial/repositories/freight-transactions-repository";

export class PrismaFreightTransactionsRepository implements FreightTransactionsRepository {
  async create(data: Prisma.FreightTransactionUncheckedCreateInput, tx?: Prisma.TransactionClient) {
    const prismaTransaction = tx ?? prisma;

    const freightTransaction = await prismaTransaction.freightTransaction.create({
      data,
    });

    return freightTransaction;
  }
}
