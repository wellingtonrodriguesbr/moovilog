import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/repositories/in-memory/in-memory-freights-repository";
import { InMemoryVehiclesRepository } from "@/repositories/in-memory/in-memory-vehicles-repository";
import { InMemoryRoutesRepository } from "@/repositories/in-memory/in-memory-routes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterFreightUseCase } from "./register-freight-use-case";
import { NotAllowedError } from "../../../use-cases/errors/not-allowed-error";
import { BadRequestError } from "../../../use-cases/errors/bad-request-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let freightsRepository: InMemoryFreightsRepository;
let routesRepository: InMemoryRoutesRepository;
let sut: RegisterFreightUseCase;

describe("Register freight use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		driversRepository = new InMemoryDriversRepository();
		freightsRepository = new InMemoryFreightsRepository();
		routesRepository = new InMemoryRoutesRepository();

		sut = new RegisterFreightUseCase(
			companyMembersRepository,
			driversRepository,
			vehiclesRepository,
			freightsRepository,
			routesRepository
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

		await driversRepository.create({
			id: "fake-driver-id-01",
			name: "John Doe Driver",
			documentNumber: "12312312312",
			phone: "11999999999",
			type: "AGGREGATE",
			creatorId: "company-member-id-01",
			companyId: "company-id-01",
		});

		await vehiclesRepository.create({
			id: "fake-vehicle-id-01",
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

		await routesRepository.create({
			id: "fake-route-01",
			name: "Fake route",
			companyId: "company-id-01",
			creatorId: "company-member-id-01",
		});
	});

	it("should be able to register a freight", async () => {
		const { freight } = await sut.execute({
			date: new Date(),
			type: "FRACTIONAL",
			deliveriesQuantity: 12,
			pickupsQuantity: 5,
			totalWeightOfDeliveries: 2400,
			totalWeightOfPickups: 1000,
			freightAmountInCents: 600,
			modality: "DAILY",
			companyMemberId: "company-member-id-01",
			driverId: "fake-driver-id-01",
			routeId: "fake-route-01",
			vehicleId: "fake-vehicle-id-01",
		});

		expect(freight.id).toEqual(expect.any(String));
		expect(freightsRepository.items[0].companyId).toEqual("company-id-01");
		expect(freightsRepository.items[0].freightAmountInCents).toEqual(60000);
	});

	it("not should be able to register a freight with the a creator role that is different between operational, manager or admin", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		const member = await companyMembersRepository.create({
			companyId: "company-id-01",
			userId: user.id,
			sector: "Diretoria",
			role: "COMERCIAL",
		});

		expect(() =>
			sut.execute({
				date: new Date(),
				type: "FRACTIONAL",
				deliveriesQuantity: 12,
				pickupsQuantity: 5,
				totalWeightOfDeliveries: 2400,
				totalWeightOfPickups: 1000,
				freightAmountInCents: 450,
				modality: "DAILY",
				companyMemberId: member.id,
				driverId: "fake-driver-id-01",
				routeId: "fake-route-01",
				vehicleId: "fake-vehicle-id-01",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});

	it("not should be able to register a freight with a date less than the current date", async () => {
		expect(() =>
			sut.execute({
				date: new Date("2024-07-15 09:00:00"),
				type: "FRACTIONAL",
				deliveriesQuantity: 12,
				pickupsQuantity: 5,
				totalWeightOfDeliveries: 2400,
				totalWeightOfPickups: 1000,
				freightAmountInCents: 580,
				modality: "DAILY",
				companyMemberId: "company-member-id-01",
				driverId: "fake-driver-id-01",
				routeId: "fake-route-01",
				vehicleId: "fake-vehicle-id-01",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
