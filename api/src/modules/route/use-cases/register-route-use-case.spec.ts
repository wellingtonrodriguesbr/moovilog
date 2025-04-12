import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryRoutesRepository } from "@/modules/route/repositories/in-memory/in-memory-routes-repository";
import { InMemoryCitiesInRouteRepository } from "@/modules/route/repositories/in-memory/in-memory-cities-in-route-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { RegisterRouteUseCase } from "@/modules/route/use-cases/register-route-use-case";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { PermissionService } from "@/services/permission-service";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let routesRepository: InMemoryRoutesRepository;
let statesRepository: InMemoryStatesRepository;
let citiesRepository: InMemoryCitiesRepository;
let citiesInRouteRepository: InMemoryCitiesInRouteRepository;
let permissionService: PermissionService;
let sut: RegisterRouteUseCase;

describe("[MODULE]: Register route use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		citiesRepository = new InMemoryCitiesRepository();
		citiesInRouteRepository = new InMemoryCitiesInRouteRepository();
		statesRepository = new InMemoryStatesRepository();
		routesRepository = new InMemoryRoutesRepository();
		permissionService = new PermissionService(companyMembersRepository);

		sut = new RegisterRouteUseCase(
			companyMembersRepository,
			routesRepository,
			citiesRepository,
			statesRepository,
			citiesInRouteRepository,
			permissionService
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
			extraData: {
				permissions: ["SUPER_ADMIN"],
			},
		});

		await statesRepository.create({
			id: "state-id-01",
			name: "São Paulo",
			acronym: "SP",
		});
	});

	it("should be able to register a route", async () => {
		const { route } = await sut.execute({
			name: "Fake route name",
			userId: "john-doe-id-01",
			cityNames: ["São Paulo", "São José dos Campos"],
			stateAcronym: "SP",
		});

		expect(route.id).toEqual(expect.any(String));
		expect(citiesInRouteRepository.items).toHaveLength(2);
		expect(citiesInRouteRepository.items[0].routeId).toStrictEqual(route.id);
		expect(citiesInRouteRepository.items[1].routeId).toStrictEqual(route.id);
	});

	it("not should be able to register a route if user is not a company member", async () => {
		expect(() =>
			sut.execute({
				name: "Fake route name",
				userId: "wrong-user-id",
				cityNames: ["city-id-01", "city-id-02"],
				stateAcronym: "SP",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("not should be able to register a route with same name", async () => {
		await sut.execute({
			name: "Fake route name",
			userId: "john-doe-id-01",
			cityNames: ["city-id-01", "city-id-02"],
			stateAcronym: "SP",
		});

		expect(() =>
			sut.execute({
				name: "Fake route name",
				userId: "john-doe-id-01",
				cityNames: ["city-id-01", "city-id-02"],
				stateAcronym: "SP",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});

	it("not should be able to register a route without cities", async () => {
		expect(() =>
			sut.execute({
				name: "Fake route name",
				userId: "john-doe-id-01",
				cityNames: [],
				stateAcronym: "SP",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
