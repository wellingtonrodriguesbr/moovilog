import { Driver, Prisma } from "@prisma/client";

export interface DriversRepository {
  create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>;
  findByDocumentNumber(documentNumber: string): Promise<Driver | null>;
  findById(id: string): Promise<Driver | null>;
}
