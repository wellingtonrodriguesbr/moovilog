import { Prisma, CityInRoute } from "@prisma/client";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCitiesInRouteRepository implements CitiesInRouteRepository {
  public items: CityInRoute[] = [];

  async create(data: Prisma.CityInRouteUncheckedCreateInput) {
    const cityInRoute = {
      id: data.id ?? randomUUID(),
      routeId: data.routeId,
      cityId: data.cityId,
    };

    this.items.push(cityInRoute);
  }

  async findManyByRouteIds(routeIds: string[]) {
    return this.items.filter((item) => routeIds.includes(item.routeId));
  }

  async findManyByRouteId(routeId: string) {
    return this.items.filter((item) => item.routeId === routeId);
  }
}
