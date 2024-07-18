import { City } from "@prisma/client";

export interface CitiesRepository {
  findByName(name: string): Promise<City | null>;
  findById(id: string): Promise<City | null>;
}
