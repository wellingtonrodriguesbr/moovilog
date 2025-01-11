import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryRoutesRepository } from "@/repositories/in-memory/in-memory-routes-repository";
import { InMemoryCitiesInRouteRepository } from "@/repositories/in-memory/in-memory-cities-in-route-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";

import { RegisterRouteUseCase } from "@/use-cases/register-route-use-case";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let routesRepository: InMemoryRoutesRepository;
let citiesInRouteRepository: InMemoryCitiesInRouteRepository;
let sut: RegisterRouteUseCase;

describe("Register route use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		citiesInRouteRepository = new InMemoryCitiesInRouteRepository();
		routesRepository = new InMemoryRoutesRepository();

		sut = new RegisterRouteUseCase(
			companyMembersRepository,
			routesRepository,
			citiesInRouteRepository
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
	});

	it("should be able to register a route", async () => {
		const { route } = await sut.execute({
			name: "Fake route name",
			userId: "john-doe-id-01",
			citiesIds: ["city-id-01", "city-id-02"],
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
				citiesIds: ["city-id-3", "city-id-04"],
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("not should be able to register a route with same name", async () => {
		await sut.execute({
			name: "Fake route name",
			userId: "john-doe-id-01",
			citiesIds: ["city-id-01", "city-id-02"],
		});

		expect(() =>
			sut.execute({
				name: "Fake route name",
				userId: "john-doe-id-01",
				citiesIds: ["city-id-3", "city-id-04"],
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});

	it("not should be able to register a route without cities", async () => {
		expect(() =>
			sut.execute({
				name: "Fake route name",
				userId: "john-doe-id-01",
				citiesIds: [],
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
