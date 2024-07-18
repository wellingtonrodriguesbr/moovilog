import { State } from "@prisma/client";

export interface StatesRepository {
  findByCityId(cityId: string): Promise<State | null>;
}
