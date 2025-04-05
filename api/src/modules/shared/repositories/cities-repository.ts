import { City, Prisma } from "@prisma/client";

export interface CitiesRepository {
	findOrCreateByNameAndStateId(
		name: string,
		stateId: string,
		tx?: Prisma.TransactionClient
	): Promise<City>;
	findOrCreateManyByStateId(
		names: string[],
		stateAcronym: string
	): Promise<City[]>;
	findManyByIds(ids: string[]): Promise<City[] | null>;
	findById(id: string): Promise<City | null>;
}
