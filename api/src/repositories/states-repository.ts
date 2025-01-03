import { Prisma, State } from "@prisma/client";

export interface StatesRepository {
	create(data: Prisma.StateUncheckedCreateInput): Promise<State>;
	findById(id: string): Promise<State | null>;
	findByNameAndAcronym(name: string, acronym: string): Promise<State | null>;
}
