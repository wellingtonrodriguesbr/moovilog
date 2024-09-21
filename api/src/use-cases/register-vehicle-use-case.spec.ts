import { beforeEach, describe, expect, it } from "vitest";
import { RegisterVehicleUseCase } from "./register-vehicle-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryVehiclesRepository } from "@/repositories/in-memory/in-memory-vehicles-repository";
import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let sut: RegisterVehicleUseCase;

describe("Register vehicle use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		driversRepository = new InMemoryDriversRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();

		sut = new RegisterVehicleUseCase(
			companyMembersRepository,
			driversRepository,
			vehiclesRepository,
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@email.com",
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
	});

	it("should be able to register a vehicle", async () => {
		const { vehicle } = await sut.execute({
			plate: "ABC-123",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "OUTSOURCED",
			fullLoadCapacity: "24.000",
			driverId: "john-doe-driver-id",
			creatorId: "john-doe-id-01",
		});

		expect(vehicle.id).toEqual(expect.any(String));
	});

	it("not should be able to register a vehicle with same plate", async () => {
		await sut.execute({
			plate: "ABC-123",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "OUTSOURCED",
			fullLoadCapacity: "24.000",
			driverId: "john-doe-driver-id",
			creatorId: "john-doe-id-01",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-123",
				year: 1996,
				body: "CLOSED",
				category: "STRAIGHT_TRUCKS",
				type: "OUTSOURCED",
				fullLoadCapacity: "24.000",
				driverId: "john-doe-driver-id",
				creatorId: "john-doe-id-01",
			}),
		).rejects.toBeInstanceOf(VehicleAlreadyExistsError);
	});

	it("not should be able to register a vehicle with the a creator role that is different between operational or admin", async () => {
		const member = await companyMembersRepository.create({
			memberId: "john-doe-id-02",
			companyId: "company-id-01",
			role: "FINANCIAL",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-123",
				year: 1996,
				body: "CLOSED",
				category: "STRAIGHT_TRUCKS",
				type: "OUTSOURCED",
				fullLoadCapacity: "24.000",
				driverId: "john-doe-driver-id",
				creatorId: member.memberId,
			}),
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
