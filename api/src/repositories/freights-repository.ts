import { Freight } from "@prisma/client";

export interface FreightsRepository {
  findManyByDriverId(driverId: string): Promise<Freight[]>;
}
