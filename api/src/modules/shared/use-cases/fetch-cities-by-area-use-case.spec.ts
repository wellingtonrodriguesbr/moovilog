import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { InMemoryAreasRepository } from "@/modules/shared/repositories/in-memory/in-memory-areas-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { FetchCitiesByAreaUseCase } from "@/modules/shared/use-cases/fetch-cities-by-area-use-case";

let statesRepository: InMemoryStatesRepository;

let citiesRepository: InMemoryCitiesRepository;
let areasRepository: InMemoryAreasRepository;

let sut: FetchCitiesByAreaUseCase;

describe("[MODULE]: Fetch cities by area use case", () => {
	beforeEach(async () => {
		statesRepository = new InMemoryStatesRepository();

		citiesRepository = new InMemoryCitiesRepository();
		areasRepository = new InMemoryAreasRepository();

		sut = new FetchCitiesByAreaUseCase(citiesRepository, areasRepository);

		await statesRepository.create({
			id: "fake-state-id",
			name: "São Paulo",
			acronym: "SP",
		});

		await areasRepository.create({
			id: "fake-area-id",
			name: "São Paulo",
			code: 15,
			stateId: "fake-state-id",
		});

		await citiesRepository.create({
			id: "fake-city-id",
			name: "São Paulo",
			stateId: "fake-state-id",
			areaId: "fake-area-id",
		});
	});

	it("should be able to fetch cities by area code", async () => {
		const { cities } = await sut.execute({
			areaCode: 15,
		});

		expect(cities).toHaveLength(1);
		expect(citiesRepository.items[0].areaId).toStrictEqual("fake-area-id");
	});

	it("should not be able to fetch cities by area code if area is not found", async () => {
		await expect(() =>
			sut.execute({
				areaCode: 10,
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
