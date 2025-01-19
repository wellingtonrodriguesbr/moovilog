import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryStatesRepository } from "@/repositories/in-memory/in-memory-states-repository";
import { InMemoryAreasRepository } from "@/repositories/in-memory/in-memory-areas-repository";
import { InMemoryCompanyStatesAreasRepository } from "@/repositories/in-memory/in-memory-company-states-areas-repository";
import { FetchStatesFromCompanyUseCase } from "@/use-cases/fetch-states-from-company-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let areasRepository: InMemoryAreasRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let statesRepository: InMemoryStatesRepository;
let companyStatesAreasRepository: InMemoryCompanyStatesAreasRepository;
let sut: FetchStatesFromCompanyUseCase;

describe("Fetch states from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		areasRepository = new InMemoryAreasRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		statesRepository = new InMemoryStatesRepository();
		companyStatesAreasRepository = new InMemoryCompanyStatesAreasRepository();
		sut = new FetchStatesFromCompanyUseCase(
			companyMembersRepository,
			statesRepository,
			companyStatesAreasRepository
		);

		await usersRepository.create({
			id: "john-doe-01",
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
			companyId: "company-id-01",
			userId: "john-doe-01",
			sector: "Gerência",
			role: "ADMIN",
		});

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

		await companyStatesAreasRepository.create({
			companyId: "company-id-01",
			stateId: "fake-state-id",
			areaId: "fake-area-id",
		});
	});

	it("should be able to fetch states from company", async () => {
		const { states } = await sut.execute({
			userId: "john-doe-01",
		});

		expect(states).toHaveLength(1);
		expect(areasRepository.items[0].stateId).toStrictEqual("fake-state-id");
	});
});
