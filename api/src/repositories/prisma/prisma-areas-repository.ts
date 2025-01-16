import { prisma } from "@/lib/prisma";
import { AreasRepository } from "@/repositories/areas-repository";

export class PrismaAreasRepository implements AreasRepository {
	async findById(id: string) {
		const area = await prisma.area.findUnique({
			where: {
				id,
			},
		});

		return area;
	}

	async findManyByStateIds(stateIds: string[]) {
		const areas = await prisma.area.findMany({
			where: {
				stateId: {
					in: stateIds,
				},
			},
		});

		return areas;
	}

	async findManyByIds(ids: string[]) {
		const areas = await prisma.area.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return areas;
	}
}
