import { prisma } from "@/lib/prisma";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";

export class PrismaCitiesRepository implements CitiesRepository {
	async findOrCreateByNameAndStateId(name: string, stateId: string) {
		const city = await prisma.city.findUnique({
			where: {
				name_stateId: {
					name,
					stateId,
				},
			},
		});

		if (!city) {
			const newCity = await prisma.city.create({
				data: {
					name,
					stateId,
				},
			});

			return newCity;
		}

		return city;
	}

	async findOrCreateManyByStateId(names: string[], stateAcronym: string) {
		const cities = await Promise.all(
			names.map((name) => this.findOrCreateByNameAndStateId(name, stateAcronym))
		);

		return cities;
	}

	async findManyByIds(ids: string[]) {
		const cities = await prisma.city.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return cities;
	}

	async findById(id: string) {
		const city = await prisma.city.findUnique({
			where: {
				id,
			},
		});

		return city;
	}
}
