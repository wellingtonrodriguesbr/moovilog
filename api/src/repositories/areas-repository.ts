import { Area } from "@prisma/client";

export interface AreasRepository {
	findById(id: string): Promise<Area | null>;
}
