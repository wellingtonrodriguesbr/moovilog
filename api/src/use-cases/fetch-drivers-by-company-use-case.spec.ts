import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { FetchDriversByCompanyUseCase } from "@/use-cases/fetch-drivers-by-company-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let driversRepository: InMemoryDriversRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: FetchDriversByCompanyUseCase;

describe("Fetch drivers by company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		driversRepository = new InMemoryDriversRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new FetchDriversByCompanyUseCase(
			driversRepository,
			companiesRepository,
			companyMembersRepository
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

		await driversRepository.create({
			name: "John Doe Driver",
			documentNumber: "12312312312",
			phone: "11999999999",
			type: "AGGREGATE",
			companyId: "company-id-01",
			creatorId: "john-doe-id-01",
		});
	});

	it("should be able to fetch drivers by company", async () => {
		const { drivers } = await sut.execute({
			companyId: "company-id-01",
			userId: "john-doe-01",
		});

		expect(driversRepository.items).toHaveLength(1);
		expect(drivers[0].id).toEqual(expect.any(String));
		expect(drivers[0].companyId).toStrictEqual("company-id-01");
	});

	it("should not be able to fetch drivers by company if user is not a company member", async () => {
		expect(
			async () =>
				await sut.execute({
					companyId: "company-id-01",
					userId: "wrong-user-id",
				})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
