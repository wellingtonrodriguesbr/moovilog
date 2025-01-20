import { Area } from "@prisma/client";

export interface AreasRepository {
	findById(id: string): Promise<Area | null>;
	findByCode(code: number): Promise<Area | null>;
	findManyByStateIds(stateIds: string[]): Promise<Area[]>;
	findManyByIds(ids: string[]): Promise<Area[] | null>;
}
