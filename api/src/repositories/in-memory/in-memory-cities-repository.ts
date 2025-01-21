import { randomUUID } from "crypto";
import { CitiesRepository } from "../cities-repository";
import { City, Prisma } from "@prisma/client";

export class InMemoryCitiesRepository implements CitiesRepository {
	public items: City[] = [];

	async create(data: Prisma.CityUncheckedCreateInput) {
		const city = {
			id: data.id ?? randomUUID(),
			name: data.name,
			stateId: data.stateId,
			areaId: data.areaId,
		};

		this.items.push(city);
		return city;
	}

	async findByNameAndState(name: string, stateId: string) {
		const city = this.items.find(
			(item) => item.name === name && item.stateId === stateId
		);

		if (!city) return null;

		return city;
	}

	async findById(id: string) {
		const city = this.items.find((item) => item.id === id);

		if (!city) return null;

		return city;
	}

	async findManyByAreaId(areaId: string) {
		const cities = this.items.filter((item) => item.areaId === areaId);

		return cities;
	}

	async findManyByIds(ids: string[]) {
		const cities = this.items.filter((item) => ids.includes(item.id));

		return cities;
	}
}
