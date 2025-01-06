import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/repositories/in-memory/in-memory-freights-repository";
import { FetchFreightsFromCompanyUseCase } from "./fetch-freights-from-company-use-case";

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

	it("should be able to fetch freights", async () => {
		const { freights } = await sut.execute({
			userId: "john-doe-id-01",
		});

		expect(freightsRepository.items).toHaveLength(1);
		expect(freights[0].id).toEqual(expect.any(String));
	});
});
