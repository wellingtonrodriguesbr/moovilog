import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
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
			freightsRepository,
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
			type: "HEADQUARTERS",
			ownerId: "john-doe-id-01",
		});

		await companyMembersRepository.create({
			companyId: "company-id-01",
			memberId: "john-doe-id-01",
			role: "ADMIN",
		});

		await freightsRepository.create({
			date: new Date("2024-07-18 09:00:00"),
			type: "FRACTIONAL",
			deliveriesQuantity: 12,
			pickupsQuantity: 5,
			totalWeightOfDeliveries: 2400,
			totalWeightOfPickups: 1000,
			freightAmountInCents: 60000,
			creatorId: "john-doe-id-01",
			driverId: "john-doe-driver-id",
			companyId: "company-id-01",
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
