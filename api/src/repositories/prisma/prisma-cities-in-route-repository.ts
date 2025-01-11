import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CitiesInRouteRepository } from "@/repositories/cities-in-route-repository";

export class PrismaRoutesRepository implements CitiesInRouteRepository {
	async create(data: Prisma.CityInRouteUncheckedCreateInput) {
		await prisma.cityInRoute.create({
			data,
		});
	}
}
