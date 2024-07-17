import { Freight, Prisma } from "@prisma/client";

export interface FreightsRepository {
  create(data: Prisma.FreightUncheckedCreateInput): Promise<Freight>;
  findById(freightId: string): Promise<Freight | null>;
  findManyByDriverId(driverId: string): Promise<Freight[]>;
  findManyByCompanyId(companyId: string): Promise<Freight[]>;
}
