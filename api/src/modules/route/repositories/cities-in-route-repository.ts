import { CityInRoute, Prisma } from "@prisma/client";

export interface CitiesInRouteRepository {
  create(data: Prisma.CityInRouteUncheckedCreateInput): Promise<void>;
  findManyByRouteIds(routeIds: string[]): Promise<CityInRoute[] | null>;
  findManyByRouteId(routeId: string): Promise<CityInRoute[] | null>;
}
