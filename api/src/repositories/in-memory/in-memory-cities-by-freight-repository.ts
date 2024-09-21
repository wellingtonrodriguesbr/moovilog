import { CityByFreight } from "@prisma/client";
import {
	CitiesByFreightRepository,
	CreateManyParams,
} from "../cities-by-freight-repository";
import { randomUUID } from "crypto";

export class InMemoryCitiesByFreightRepository
implements CitiesByFreightRepository
{
	public items: CityByFreight[] = [];

	async createMany(params: CreateManyParams) {
		params.citiesIds.map((cityId) =>
			this.items.push({
				id: randomUUID(),
				freightId: params.freightId,
				cityId,
			}),
		);
	}
}
