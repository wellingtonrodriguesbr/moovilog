import { Prisma, Route } from "@prisma/client";
import { RoutesRepository } from "../routes-repository";
import { randomUUID } from "crypto";

export class InMemoryRoutesRepository implements RoutesRepository {
	public items: Route[] = [];

	async create(data: Prisma.RouteUncheckedCreateInput) {
		const route = {
			id: data.id ?? randomUUID(),
			name: data.name,
			companyId: data.companyId,
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
}
