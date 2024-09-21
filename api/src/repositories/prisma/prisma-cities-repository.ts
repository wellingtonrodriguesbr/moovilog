import { prisma } from "@/lib/prisma";
import { CitiesRepository } from "../cities-repository";
import { City } from "@prisma/client";

export class PrismaCitiesRepository implements CitiesRepository {
	async findByName(name: string) {
		const city = await prisma.city.findFirst({
			where: {
				name,
			},
		});

		if (!city) {
			return null;
		}

		return city;
	}

	async findById(id: string): Promise<City | null> {
		const city = await prisma.city.findUnique({
			where: {
				id,
			},
		});

		if (!city) {
			return null;
		}

		return city;
	}
}
