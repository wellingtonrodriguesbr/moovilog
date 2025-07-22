import { Prisma } from "@prisma/client";

export interface PickupHistoriesRepository {
  create(data: Prisma.PickupHistoryUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<void>;
}
