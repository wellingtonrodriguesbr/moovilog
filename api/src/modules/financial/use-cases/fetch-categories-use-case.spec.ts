import { beforeEach, describe, expect, it } from "vitest";
import { FetchCategoriesUseCase } from "@/modules/financial/use-cases/fetch-categories-use-case";
import { InMemoryFinanceCategoriesRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-categories-repository";

let financeCategoriesRepository: InMemoryFinanceCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe("[MODULE]: Fetch categories use case", () => {
	beforeEach(async () => {
		financeCategoriesRepository = new InMemoryFinanceCategoriesRepository();
		sut = new FetchCategoriesUseCase(financeCategoriesRepository);

		await financeCategoriesRepository.create({
			id: "category-id-01",
			name: "Frete",
		});

		await financeCategoriesRepository.create({
			id: "category-id-02",
			name: "Coleta",
		});
	});

	it("should be able to fetch categories", async () => {
		const { categories } = await sut.execute();

		expect(categories).toHaveLength(2);
	});
});
