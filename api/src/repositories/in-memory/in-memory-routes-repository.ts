import { Prisma, Route } from "@prisma/client";
import { RoutesRepository } from "@/repositories/routes-repository";
import { randomUUID } from "crypto";

export class InMemoryRoutesRepository implements RoutesRepository {
	public items: Route[] = [];

	async create(data: Prisma.RouteUncheckedCreateInput) {
		const route = {
			id: data.id ?? randomUUID(),
			name: data.name,
			companyId: data.companyId,
			creatorId: data.creatorId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(route);
		return route;
	}

	async findById(id: string) {
		const state = this.items.find((item) => item.id === id);

		if (!state) {
			return null;
		}

		return state;
	}

	async findRouteInCompanyWithSameName(name: string, companyId: string) {
		const route = this.items.find(
			(item) => item.name === name && item.companyId === companyId
		);

		if (!route) {
			return null;
		}

		return route;
	}

	async findManyByCompanyId(companyId: string) {
		const routes = this.items.filter((item) => item.companyId === companyId);

		return routes;
	}
}
