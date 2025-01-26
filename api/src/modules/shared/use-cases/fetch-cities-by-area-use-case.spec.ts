import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryStatesRepository } from "@/repositories/in-memory/in-memory-states-repository";

import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCitiesRepository } from "@/repositories/in-memory/in-memory-cities-repository";
import { InMemoryAreasRepository } from "@/repositories/in-memory/in-memory-areas-repository";

import { FetchCitiesByAreaUseCase } from "@/modules/shared/use-cases/fetch-cities-by-area-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let statesRepository: InMemoryStatesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let citiesRepository: InMemoryCitiesRepository;
let areasRepository: InMemoryAreasRepository;

let sut: FetchCitiesByAreaUseCase;

describe("Fetch cities by area use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		statesRepository = new InMemoryStatesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		citiesRepository = new InMemoryCitiesRepository();
		areasRepository = new InMemoryAreasRepository();

		sut = new FetchCitiesByAreaUseCase(
			companyMembersRepository,
			citiesRepository,
			areasRepository
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companiesRepository.create({
			id: "company-id-01",
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-01",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			role: "ADMIN",
		});

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
			userId: "john-doe-id-01",
			areaCode: 15,
		});

		expect(cities).toHaveLength(1);
		expect(citiesRepository.items[0].areaId).toStrictEqual("fake-area-id");
	});
});
