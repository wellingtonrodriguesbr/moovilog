import { randomUUID } from "node:crypto";
import { Area, Prisma } from "@prisma/client";
import { AreasRepository } from "@/repositories/areas-repository";

export class InMemoryAreasRepository implements AreasRepository {
	public items: Area[] = [];

	async create(data: Prisma.AreaUncheckedCreateInput) {
		const area = {
			id: data.id ?? randomUUID(),
			name: data.name,
			code: data.code,
			stateId: data.stateId,
		};

		this.items.push(area);

		return area;
	}

	async findById(id: string) {
		const area = this.items.find((item) => item.id === id);

		if (!area) return null;

		return area;
	}

	async findManyByStateIds(stateIds: string[]) {
		const areas = this.items.filter((item) => stateIds.includes(item.stateId));

		return areas;
	}
}
