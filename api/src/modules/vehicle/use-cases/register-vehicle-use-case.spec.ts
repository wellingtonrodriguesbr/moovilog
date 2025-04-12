import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryVehiclesRepository } from "@/modules/vehicle/repositories/in-memory/in-memory-vehicles-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { VehicleAlreadyExistsInCompanyError } from "@/modules/vehicle/use-cases/errors/vehicle-already-exists-in-company-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { RegisterVehicleUseCase } from "@/modules/vehicle/use-cases/register-vehicle-use-case";
import { PermissionService } from "@/services/permission-service";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let permissionService: PermissionService;
let sut: RegisterVehicleUseCase;

describe("[MODULE]: Register vehicle use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();
		permissionService = new PermissionService(companyMembersRepository);

		sut = new RegisterVehicleUseCase(
			companyMembersRepository,
			vehiclesRepository,
			permissionService
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
			extraData: {
				permissions: ["MANAGE_VEHICLES_AND_DRIVERS"],
			},
		});
	});

	it("should be able to register a vehicle", async () => {
		const { vehicle } = await sut.execute({
			plate: "ABC-123",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "AGGREGATE",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			userId: "john-doe-id-01",
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
			type: "AGGREGATE",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			userId: "john-doe-id-01",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-143",
				year: 1996,
				body: "OPEN",
				category: "STRAIGHT_TRUCKS",
				type: "AGGREGATE",
				fullLoadCapacity: 4500,
				brand: "Mercedes-Benz",
				model: "710",
				userId: "john-doe-id-01",
			})
		).rejects.toBeInstanceOf(VehicleAlreadyExistsInCompanyError);
	});

	it("not should be able to register a vehicle with same trailer plate", async () => {
		await sut.execute({
			plate: "ABC-142",
			trailerPlate: "ABC-143",
			year: 1996,
			body: "CLOSED",
			category: "STRAIGHT_TRUCKS",
			type: "AGGREGATE",
			fullLoadCapacity: 4500,
			brand: "Mercedes-Benz",
			model: "710",
			userId: "john-doe-id-01",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-141",
				trailerPlate: "ABC-143",
				year: 1996,
				body: "OPEN",
				category: "STRAIGHT_TRUCKS",
				type: "AGGREGATE",
				fullLoadCapacity: 4500,
				brand: "Mercedes-Benz",
				model: "710",
				userId: "john-doe-id-01",
			})
		).rejects.toBeInstanceOf(VehicleAlreadyExistsInCompanyError);
	});

	it("should not be possible to register a vehicle if the creator does not have the necessary permissions", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			userId: user.id,
			companyId: "company-id-01",
			extraData: JSON.stringify({
				permissions: ["VIEW_VEHICLES_AND_DRIVERS"],
			}),
			sector: "Financeiro",
		});

		await expect(() =>
			sut.execute({
				plate: "ABC-123",
				year: 1996,
				body: "CLOSED",
				category: "STRAIGHT_TRUCKS",
				type: "AGGREGATE",
				fullLoadCapacity: 4500,
				brand: "Mercedes-Benz",
				model: "710",
				userId: user.id,
			})
		).rejects.toBeInstanceOf(NotAllowedError);
		expect(vehiclesRepository.items).toHaveLength(0);
	});
});
