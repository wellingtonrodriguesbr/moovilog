import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryStatesRepository } from "@/repositories/in-memory/in-memory-states-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryAreasRepository } from "@/repositories/in-memory/in-memory-areas-repository";
import { RegisterCompanyAreaServiceUseCase } from "./register-company-area-service-use-case";
import { InMemoryCompanyStatesAreasRepository } from "@/repositories/in-memory/in-memory-company-states-areas-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let companyStatesAreasRepository: InMemoryCompanyStatesAreasRepository;
let statesRepository: InMemoryStatesRepository;
let areasRepository: InMemoryAreasRepository;
let sut: RegisterCompanyAreaServiceUseCase;

describe("Register company area service use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();

		companyMembersRepository = new InMemoryCompanyMembersRepository();
		companyStatesAreasRepository = new InMemoryCompanyStatesAreasRepository();
		statesRepository = new InMemoryStatesRepository();
		areasRepository = new InMemoryAreasRepository();

		sut = new RegisterCompanyAreaServiceUseCase(
			companyMembersRepository,
			statesRepository,
			areasRepository,
			companyStatesAreasRepository
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
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

		await areasRepository.create({
			id: "fake-area-id-2",
			name: "Grande Campinas",
			code: 19,
			stateId: "fake-state-id",
		});

		await companiesRepository.create({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-id-01",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			role: "ADMIN",
		});
	});

	it("should be able to register company area service", async () => {
		await sut.execute({
			userId: "john-doe-id-01",
			stateIds: ["fake-state-id"],
			areaIds: ["fake-area-id", "fake-area-id-2"],
		});

		expect(companyStatesAreasRepository.items).toHaveLength(2);
		expect(companyStatesAreasRepository.items[0].companyId).toStrictEqual(
			"company-id-01"
		);
		expect(companyStatesAreasRepository.items[0].stateId).toStrictEqual(
			"fake-state-id"
		);
		expect(companyStatesAreasRepository.items[1].stateId).toStrictEqual(
			"fake-state-id"
		);
	});

	it("should throw an error if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				stateIds: ["fake-state-id"],
				areaIds: ["fake-area-id"],
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should throw an error if no states are found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-01",
				stateIds: ["non-existent-state-id"],
				areaIds: ["fake-area-id"],
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should throw an error if no areas are found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-01",
				stateIds: ["fake-state-id"],
				areaIds: ["non-existent-area-id"],
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not insert duplicate entries for the same state and area", async () => {
		await sut.execute({
			userId: "john-doe-id-01",
			stateIds: ["fake-state-id"],
			areaIds: ["fake-area-id"],
		});

		await sut.execute({
			userId: "john-doe-id-01",
			stateIds: ["fake-state-id"],
			areaIds: ["fake-area-id"],
		});

		expect(companyStatesAreasRepository.items).toHaveLength(1);
	});
});
