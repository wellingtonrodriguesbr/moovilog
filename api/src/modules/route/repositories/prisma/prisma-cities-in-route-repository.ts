import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";

export class PrismaCitiesInRouteRepository implements CitiesInRouteRepository {
	async create(data: Prisma.CityInRouteUncheckedCreateInput) {
		await prisma.cityInRoute.create({
			data,
		});
	}

	async findManyByRouteIds(routeIds: string[]) {
		const citiesInRoute = await prisma.cityInRoute.findMany({
			where: {
				routeId: {
					in: routeIds,
				},
			},
		});

		return citiesInRoute;
	}

	async findManyByRouteId(routeId: string) {
		const citiesInRoute = await prisma.cityInRoute.findMany({
			where: {
				routeId,
			},
		});

		return citiesInRoute;
	}
}
