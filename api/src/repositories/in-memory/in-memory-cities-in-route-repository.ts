import { randomUUID } from "crypto";
import { Prisma, CityInRoute } from "@prisma/client";
import { CitiesInRouteRepository } from "@/repositories/cities-in-route-repository";

export class InMemoryCitiesInRouteRepository
	implements CitiesInRouteRepository
{
	public items: CityInRoute[] = [];

	async create(data: Prisma.CityInRouteUncheckedCreateInput) {
		const cityInRoute = {
			id: data.id ?? randomUUID(),
			routeId: data.routeId,
			cityId: data.cityId,
		};

		this.items.push(cityInRoute);
	}
}
