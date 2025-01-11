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
}
