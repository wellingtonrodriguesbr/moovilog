import { prisma } from "@/lib/prisma";
import { CitiesRepository } from "@/repositories/cities-repository";

export class PrismaCitiesRepository implements CitiesRepository {
	async findByNameAndState(name: string) {
		const city = await prisma.city.findFirst({
			where: {
				name,
			},
		});

		return city;
	}

	async findById(id: string) {
		const city = await prisma.city.findUnique({
			where: {
				id,
			},
		});

		return city;
	}

	async findManyByAreaId(areaId: string) {
		const cities = await prisma.city.findMany({
			where: {
				areaId,
			},
		});

		return cities;
	}
}
