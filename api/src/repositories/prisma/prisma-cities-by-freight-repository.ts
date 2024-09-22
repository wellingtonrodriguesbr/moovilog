import { prisma } from "@/lib/prisma";
import {
	CitiesByFreightRepository,
	CreateManyParams,
} from "../cities-by-freight-repository";

export class PrismaCitiesByFreightRepository
	implements CitiesByFreightRepository
{
	async createMany(params: CreateManyParams) {
		const data = params.citiesIds.map((cityId) => {
			return {
				freightId: params.freightId,
				cityId,
			};
		});

		await prisma.cityByFreight.createMany({
			data,
		});
	}
}
