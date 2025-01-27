import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryVehiclesRepository } from "@/modules/vehicle/repositories/in-memory/in-memory-vehicles-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { FetchVehiclesFromCompanyUseCase } from "@/modules/vehicle/use-cases/fetch-vehicles-from-company-use-case";

let usersRepository: InMemoryUsersRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: FetchVehiclesFromCompanyUseCase;

describe("[MODULE]: Fetch vehicles from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new FetchVehiclesFromCompanyUseCase(
			vehiclesRepository,
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
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-01",
			sector: "Gerência",
			role: "ADMIN",
		});

		await vehiclesRepository.create({
			plate: "ABC-123",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "OUTSOURCED",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			creatorId: "company-member-id-01",
			companyId: "company-id-01",
		});
	});

	it("should be able to fetch vehicles by company", async () => {
		const { vehicles } = await sut.execute({
			companyId: "company-id-01",
			userId: "john-doe-01",
		});

		expect(vehiclesRepository.items).toHaveLength(1);
		expect(vehicles[0].id).toEqual(expect.any(String));
		expect(vehicles[0].companyId).toStrictEqual("company-id-01");
	});

	it("should not be able to fetch vehicles by company if user is not a company member", async () => {
		expect(
			async () =>
				await sut.execute({
					companyId: "company-id-01",
					userId: "wrong-user-id",
				})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
