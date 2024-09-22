import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/repositories/in-memory/in-memory-freights-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { FetchFreightsFromDriverUseCase } from "./fetch-freights-from-driver-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let driversRepository: InMemoryDriversRepository;
let freightsRepository: InMemoryFreightsRepository;
let sut: FetchFreightsFromDriverUseCase;

describe("Fetch freights from driver use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		driversRepository = new InMemoryDriversRepository();
		freightsRepository = new InMemoryFreightsRepository();
		sut = new FetchFreightsFromDriverUseCase(
			driversRepository,
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
			type: "HEADQUARTERS",
			ownerId: "john-doe-id-01",
		});

		await driversRepository.create({
			id: "john-doe-driver-id",
			name: "John Doe Driver",
			documentNumber: "11111111111",
			password: "12345678",
			phone: "11111111111",
			companyId: "company-id-01",
			creatorId: "john-doe-id-01",
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
			driverId: "john-doe-driver-id",
		});

		expect(freightsRepository.items).toHaveLength(1);
		expect(freights[0].id).toEqual(expect.any(String));
	});
});
