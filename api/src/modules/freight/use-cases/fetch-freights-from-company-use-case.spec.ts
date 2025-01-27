import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/modules/freight/repositories/in-memory/in-memory-freights-repository";
import { FetchFreightsFromCompanyUseCase } from "@/modules/freight/use-cases/fetch-freights-from-company-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let freightsRepository: InMemoryFreightsRepository;
let sut: FetchFreightsFromCompanyUseCase;

describe("Fetch freights from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		freightsRepository = new InMemoryFreightsRepository();
		sut = new FetchFreightsFromCompanyUseCase(
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
			type: "PARTIAL",
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

	it("should be able to fetch freights", async () => {
		const { freights } = await sut.execute({
			userId: "john-doe-id-01",
			companyId: "company-id-01",
		});

		expect(freightsRepository.items).toHaveLength(1);
		expect(freights[0].id).toEqual(expect.any(String));
	});

	it("should not be able to fetch freights if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch freights if the company is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-01",
				companyId: "non-existent-company-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
