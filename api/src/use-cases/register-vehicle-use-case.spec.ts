import { beforeEach, describe, expect, it } from "vitest";
import { RegisterVehicleUseCase } from "./register-vehicle-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryVehiclesRepository } from "@/repositories/in-memory/in-memory-vehicles-repository";
import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let sut: RegisterVehicleUseCase;

describe("Register vehicle use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();

		sut = new RegisterVehicleUseCase(
			companyMembersRepository,
			vehiclesRepository
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
	});

	it("should be able to register a vehicle", async () => {
		const { vehicle } = await sut.execute({
			plate: "ABC-123",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "OUTSOURCED",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			companyMemberId: "company-member-id-01",
		});

		expect(vehicle.id).toEqual(expect.any(String));
		expect(vehiclesRepository.items).toHaveLength(1);
		expect(vehiclesRepository.items[0].creatorId).toEqual(
			"company-member-id-01"
		);
	});

	it("not should be able to register a vehicle with same plate", async () => {
		await sut.execute({
			plate: "ABC-143",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "OUTSOURCED",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			companyMemberId: "company-member-id-01",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-143",
				year: 1996,
				body: "OPEN",
				category: "STRAIGHT_TRUCKS",
				type: "OUTSOURCED",
				fullLoadCapacity: 4500,
				brand: "Mercedes-Benz",
				model: "710",
				companyMemberId: "company-member-id-01",
			})
		).rejects.toBeInstanceOf(VehicleAlreadyExistsError);
	});

	it("not should be able to register a vehicle with the a creator role that is different between manager or admin", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		const member = await companyMembersRepository.create({
			userId: user.id,
			companyId: "company-id-01",
			role: "FINANCIAL",
			sector: "Financeiro",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-123",
				year: 1996,
				body: "CLOSED",
				category: "STRAIGHT_TRUCKS",
				type: "OUTSOURCED",
				fullLoadCapacity: 4500,
				brand: "Mercedes-Benz",
				model: "710",
				companyMemberId: member.id,
			})
		).rejects.toBeInstanceOf(NotAllowedError);
		expect(vehiclesRepository.items).toHaveLength(0);
	});
});
