import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/repositories/in-memory/in-memory-freights-repository";
import { InMemoryFreightInformationRepository } from "@/repositories/in-memory/in-memory-freight-information-repository";
import { GetFreightInformationAsADriverUseCase } from "./get-freight-information-as-a-driver-use-case";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;

let driversRepository: InMemoryDriversRepository;
let freightsRepository: InMemoryFreightsRepository;
let freightsInformationRepository: InMemoryFreightInformationRepository;
let sut: GetFreightInformationAsADriverUseCase;

describe("Get freight information as a driver use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();

		driversRepository = new InMemoryDriversRepository();
		freightsRepository = new InMemoryFreightsRepository();
		freightsInformationRepository = new InMemoryFreightInformationRepository();
		sut = new GetFreightInformationAsADriverUseCase(
			driversRepository,
			freightsRepository,
			freightsInformationRepository,
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
			id: "fake-freight-01",
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

		await freightsInformationRepository.create({
			freightId: "fake-freight-01",
		});
	});

	it("should be able to get a freight information", async () => {
		const { freightInformation } = await sut.execute({
			driverId: "john-doe-driver-id",
			freightId: "fake-freight-01",
		});

		expect(freightInformation.freightId).toEqual("fake-freight-01");
	});

	it("should not be able to get freight information from another driver", async () => {
		await driversRepository.create({
			id: "wrong-john-doe-driver-id",
			name: "John Doe Driver",
			documentNumber: "11111111111",
			password: "12345678",
			phone: "11111111111",
			companyId: "company-id-01",
			creatorId: "john-doe-id-01",
		});

		expect(() =>
			sut.execute({
				driverId: "wrong-john-doe-driver-id",
				freightId: "fake-freight-01",
			}),
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
