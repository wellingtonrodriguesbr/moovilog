import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryRoutesRepository } from "@/modules/route/repositories/in-memory/in-memory-routes-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { FetchRoutesFromCompanyUseCase } from "@/modules/route/use-cases/fetch-routes-from-company-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let statesRepository: InMemoryStatesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let routesRepository: InMemoryRoutesRepository;
let sut: FetchRoutesFromCompanyUseCase;

describe("Fetch routes from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		statesRepository = new InMemoryStatesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		routesRepository = new InMemoryRoutesRepository();
		sut = new FetchRoutesFromCompanyUseCase(
			companyMembersRepository,
			companiesRepository,
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
	});

	it("should be able to fetch routes from company", async () => {
		const { routes } = await sut.execute({
			userId: "john-doe-01",
			companyId: "company-id-01",
		});

		expect(routes).toHaveLength(1);
		expect(routes[0]).toEqual(
			expect.objectContaining({
				id: "route-01",
				name: "Route A",
			})
		);
	});

	it("should not be able to fetch routes from company if company member is not found", async () => {
		await expect(() =>
			sut.execute({ userId: "non-existent-user", companyId: "company-id-01" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch routes from company if company is not found", async () => {
		await expect(() =>
			sut.execute({ userId: "john-doe-01", companyId: "non-existent-company" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
