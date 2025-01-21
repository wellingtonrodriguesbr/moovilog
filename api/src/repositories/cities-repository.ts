import { City } from "@prisma/client";

export interface CitiesRepository {
	findByNameAndState(name: string, stateId: string): Promise<City | null>;
	findById(id: string): Promise<City | null>;
	findManyByAreaId(areaId: string): Promise<City[]>;
	findManyByIds(ids: string[]): Promise<City[]>;
}
