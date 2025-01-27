import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryRoutesRepository } from "@/modules/route/repositories/in-memory/in-memory-routes-repository";
import { InMemoryCitiesInRouteRepository } from "@/modules/route/repositories/in-memory/in-memory-cities-in-route-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryAreasRepository } from "@/modules/shared/repositories/in-memory/in-memory-areas-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { FetchCitiesFromRouteUseCase } from "@/modules/route/use-cases/fetch-cities-from-route-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let areasRepository: InMemoryAreasRepository;
let statesRepository: InMemoryStatesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let routesRepository: InMemoryRoutesRepository;
let citiesInRouteRepository: InMemoryCitiesInRouteRepository;
let citiesRepository: InMemoryCitiesRepository;
let sut: FetchCitiesFromRouteUseCase;

describe("[MODULE]: Fetch cities from route use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		areasRepository = new InMemoryAreasRepository();
		statesRepository = new InMemoryStatesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		routesRepository = new InMemoryRoutesRepository();
		citiesInRouteRepository = new InMemoryCitiesInRouteRepository();
		citiesRepository = new InMemoryCitiesRepository();
		sut = new FetchCitiesFromRouteUseCase(
			companyMembersRepository,
			routesRepository,
			citiesInRouteRepository,
			citiesRepository
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

		await citiesRepository.create({
			id: "city-01",
			name: "City A",
			stateId: "fake-state-id",
			areaId: "fake-area-id",
		});

		await citiesInRouteRepository.create({
			routeId: "route-01",
			cityId: "city-01",
		});
	});

	it("should be able to fetch cities from route", async () => {
		const { cities } = await sut.execute({
			userId: "john-doe-01",
			routeId: "route-01",
		});

		expect(cities).toHaveLength(1);
		expect(cities[0]).toEqual(
			expect.objectContaining({
				id: "city-01",
				name: "City A",
				stateId: "fake-state-id",
				areaId: "fake-area-id",
			})
		);
	});

	it("should not be able to fetch cities if company member is not found", async () => {
		await expect(() =>
			sut.execute({ userId: "non-existent-user", routeId: "route-01" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch cities if no cities in route are found", async () => {
		await citiesInRouteRepository.items.pop();

		await expect(() =>
			sut.execute({ userId: "john-doe-01", routeId: "route-01" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch cities if no cities are found", async () => {
		await citiesRepository.items.pop();

		await expect(() =>
			sut.execute({ userId: "john-doe-01", routeId: "route-01" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
