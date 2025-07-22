import { Freight, Prisma } from "@prisma/client";

export interface FreightsRepository {
  create(data: Prisma.FreightUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Freight>;
  findById(id: string): Promise<Freight | null>;
  findManyByDriverId(driverId: string): Promise<Freight[]>;
  findManyByCompanyId(companyId: string): Promise<Freight[]>;
}
