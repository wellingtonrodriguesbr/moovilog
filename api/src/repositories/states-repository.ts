import { Prisma, State } from "@prisma/client";

export interface StatesRepository {
	create(data: Prisma.StateUncheckedCreateInput): Promise<State>;
	findById(id: string): Promise<State | null>;
	findByNameAndAcronym(name: string, acronym: string): Promise<State | null>;
	findByAcronym(acronym: string): Promise<State | null>;
	findManyByAcronyms(acronyms: string[]): Promise<State[] | null>;
	findManyByIds(ids: string[]): Promise<State[] | null>;
}
