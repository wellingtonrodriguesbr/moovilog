import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryAreasRepository } from "@/modules/shared/repositories/in-memory/in-memory-areas-repository";
import { FetchAreasByStatesUseCase } from "@/modules/shared/use-cases/fetch-areas-by-states-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

let statesRepository: InMemoryStatesRepository;
let areasRepository: InMemoryAreasRepository;
let sut: FetchAreasByStatesUseCase;

describe("[MODULE]: Fetch areas by states use case", () => {
	beforeEach(async () => {
		statesRepository = new InMemoryStatesRepository();
		areasRepository = new InMemoryAreasRepository();
		sut = new FetchAreasByStatesUseCase(statesRepository, areasRepository);

		await statesRepository.create({
			id: "fake-state-id",
			name: "São Paulo",
			acronym: "SP",
		});

		await areasRepository.create({
			id: "fake-area-id",
			name: "Area name",
			code: 15,
			stateId: "fake-state-id",
		});
	});

	it("should be able to fetch areas by states", async () => {
		const { areas } = await sut.execute({
			stateAcronyms: ["SP"],
		});

		expect(areas).toHaveLength(1);
		expect(areasRepository.items[0].stateId).toStrictEqual("fake-state-id");
	});

	it("should not be able to fetch areas by states if the state is not found", async () => {
		await expect(() =>
			sut.execute({
				stateAcronyms: ["RJ"],
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
