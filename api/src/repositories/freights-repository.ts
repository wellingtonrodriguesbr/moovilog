import { Freight, Prisma } from "@prisma/client";

export interface FreightsRepository {
  create(data: Prisma.FreightUncheckedCreateInput): Promise<Freight>;
  findManyByDriverId(driverId: string): Promise<Freight[]>;
  findManyByCompanyId(companyId: string): Promise<Freight[]>;
}
