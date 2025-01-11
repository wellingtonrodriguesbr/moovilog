import { Prisma } from "@prisma/client";

export interface CitiesInRouteRepository {
	create(data: Prisma.CityInRouteUncheckedCreateInput): Promise<void>;
}
