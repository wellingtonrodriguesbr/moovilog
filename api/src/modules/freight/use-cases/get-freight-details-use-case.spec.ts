import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/modules/freight/repositories/in-memory/in-memory-freights-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { GetFreightDetailsUseCase } from "@/modules/freight/use-cases/get-freight-details-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let freightsRepository: InMemoryFreightsRepository;
let sut: GetFreightDetailsUseCase;

describe("[MODULE]: Get freight details use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		freightsRepository = new InMemoryFreightsRepository();
		sut = new GetFreightDetailsUseCase(
			companyMembersRepository,
			companiesRepository,
			freightsRepository
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

		await freightsRepository.create({
			date: new Date(),
			type: "FRACTIONAL",
			deliveriesQuantity: 12,
			pickupsQuantity: 5,
			totalWeightOfDeliveries: 2400,
			totalWeightOfPickups: 1000,
			freightAmountInCents: 600,
			modality: "DAILY",
			creatorId: "company-member-id-01",
			companyId: "company-id-01",
			driverId: "fake-driver-id-01",
			routeId: "fake-route-01",
			vehicleId: "fake-vehicle-id-01",
		});
	});

	it("should be able to get freight details", async () => {
		const { freight } = await sut.execute({
			userId: "john-doe-id-01",
			companyId: "company-id-01",
			freightId: freightsRepository.items[0].id,
		});

		expect(freight.modality).toStrictEqual("DAILY");
		expect(freight.type).toStrictEqual("FRACTIONAL");
		expect(freight.freightAmountInCents).toEqual(600);
	});

	it("should not be able to fetch freights if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				companyId: "company-id-01",
				freightId: freightsRepository.items[0].id,
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch freights if the company is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-01",
				companyId: "non-existent-company-id",
				freightId: freightsRepository.items[0].id,
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
