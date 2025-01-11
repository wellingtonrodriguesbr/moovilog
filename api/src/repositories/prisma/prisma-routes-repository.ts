import { Prisma } from "@prisma/client";
import { RoutesRepository } from "@/repositories/routes-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRoutesRepository implements RoutesRepository {
	async create(data: Prisma.RouteUncheckedCreateInput) {
		const route = await prisma.route.create({
			data,
		});

		return route;
	}

	async findById(id: string) {
		const route = await prisma.route.findUnique({
			where: {
				id,
			},
		});

		if (!route) {
			return null;
		}

		return route;
	}

	async findRouteInCompanyWithSameName(name: string, companyId: string) {
		const route = await prisma.route.findFirst({
			where: {
				name,
				companyId,
			},
		});

		return route;
	}
}
