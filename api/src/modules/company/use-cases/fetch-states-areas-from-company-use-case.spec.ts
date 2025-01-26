import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryAreasRepository } from "@/modules/shared/repositories/in-memory/in-memory-areas-repository";
import { InMemoryCompanyStatesAreasRepository } from "@/modules/company/repositories/in-memory/in-memory-company-states-areas-repository";
import { FetchStatesAreasFromCompanyUseCase } from "@/modules/company/use-cases/fetch-states-areas-from-company-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let areasRepository: InMemoryAreasRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let statesRepository: InMemoryStatesRepository;
let companyStatesAreasRepository: InMemoryCompanyStatesAreasRepository;
let sut: FetchStatesAreasFromCompanyUseCase;

describe("[MODULE]: Fetch states and areas from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		statesRepository = new InMemoryStatesRepository();
		areasRepository = new InMemoryAreasRepository();
		companyStatesAreasRepository = new InMemoryCompanyStatesAreasRepository();
		sut = new FetchStatesAreasFromCompanyUseCase(
			companyMembersRepository,
			companyStatesAreasRepository,
			statesRepository,
			areasRepository
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

	it("should be able to fetch states and areas from company", async () => {
		const { states, areas } = await sut.execute({
			userId: "john-doe-01",
			companyId: "company-id-01",
		});

		expect(states).toHaveLength(1);
		expect(areas).toHaveLength(1);
		expect(companyStatesAreasRepository.items[0].stateId).toStrictEqual(
			"fake-state-id"
		);
		expect(companyStatesAreasRepository.items[0].areaId).toStrictEqual(
			"fake-area-id"
		);
	});

	it("not should be able to fetch states and areas if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("not should be able to fetch states and areas if the company is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-01",
				companyId: "non-existent-company-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should be able to dispatch error if the states not found for the company ", async () => {
		companyStatesAreasRepository.items.pop();

		await expect(() =>
			sut.execute({
				userId: "john-doe-01",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should be able to dispatch error if the areas not found for the company ", async () => {
		companyStatesAreasRepository.items.pop();

		await expect(() =>
			sut.execute({
				userId: "john-doe-01",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
