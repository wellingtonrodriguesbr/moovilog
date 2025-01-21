import { beforeEach, describe, expect, it } from "vitest";
import { FetchCompanyRoutesUseCase } from "@/use-cases/fetch-company-routes-use-case";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryRoutesRepository } from "@/repositories/in-memory/in-memory-routes-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryAreasRepository } from "@/repositories/in-memory/in-memory-areas-repository";
import { InMemoryStatesRepository } from "@/repositories/in-memory/in-memory-states-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let areasRepository: InMemoryAreasRepository;
let statesRepository: InMemoryStatesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let routesRepository: InMemoryRoutesRepository;
let sut: FetchCompanyRoutesUseCase;

describe("Fetch Company Routes Use Case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		areasRepository = new InMemoryAreasRepository();
		statesRepository = new InMemoryStatesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		routesRepository = new InMemoryRoutesRepository();
		sut = new FetchCompanyRoutesUseCase(
			companyMembersRepository,
			routesRepository
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

		await routesRepository.create({
			id: "route-01",
			name: "Route A",
			companyId: "company-id-01",
			creatorId: "company-member-01",
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await statesRepository.create({
			id: "fake-state-id",
			name: "São Paulo",
			acronym: "SP",
		});

		await areasRepository.create({
			id: "fake-area-id",
			name: "Area A",
			code: 15,
			stateId: "fake-state-id",
		});
	});

	it("should be able to fetch routes and cities for a company member", async () => {
		const { routes } = await sut.execute({
			userId: "john-doe-01",
		});

		expect(routes).toHaveLength(1);
		expect(routes[0]).toEqual(
			expect.objectContaining({
				id: "route-01",
				name: "Route A",
			})
		);
	});

	it("should throw an error if company member is not found", async () => {
		await expect(() =>
			sut.execute({ userId: "non-existent-user" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
