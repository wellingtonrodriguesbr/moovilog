import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryDriversRepository } from "@/modules/driver/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryFreightsRepository } from "@/modules/freight/repositories/in-memory/in-memory-freights-repository";
import { InMemoryVehiclesRepository } from "@/modules/vehicle/repositories/in-memory/in-memory-vehicles-repository";
import { InMemoryRoutesRepository } from "@/modules/route/repositories/in-memory/in-memory-routes-repository";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { RegisterFreightUseCase } from "@/modules/freight/use-cases/register-freight-use-case";
import { InMemoryFinanceTransactionsRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-transactions-repository";
import { InMemoryFinanceCategoriesRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-categories-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let freightsRepository: InMemoryFreightsRepository;
let routesRepository: InMemoryRoutesRepository;
let financeTransactionsRepository: InMemoryFinanceTransactionsRepository;
let financeCategoriesRepository: InMemoryFinanceCategoriesRepository;
let sut: RegisterFreightUseCase;

describe("[MODULE]: Register freight use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		vehiclesRepository = new InMemoryVehiclesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		driversRepository = new InMemoryDriversRepository();
		freightsRepository = new InMemoryFreightsRepository();
		routesRepository = new InMemoryRoutesRepository();
		financeTransactionsRepository = new InMemoryFinanceTransactionsRepository();
		financeCategoriesRepository = new InMemoryFinanceCategoriesRepository();

		sut = new RegisterFreightUseCase(
			companyMembersRepository,
			driversRepository,
			vehiclesRepository,
			freightsRepository,
			routesRepository,
			financeTransactionsRepository,
			financeCategoriesRepository
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

		await financeCategoriesRepository.create({
			id: "fake-finance-category-id-01",
			name: "Frete",
		});
	});

	it("should be able to register a freight", async () => {
		const { freight } = await sut.execute({
			date: new Date(),
			paymentDate: new Date(),
			type: "FRACTIONAL",
			deliveriesQuantity: 12,
			pickupsQuantity: 5,
			totalWeightOfDeliveries: 2400,
			totalWeightOfPickups: 1000,
			freightAmountInCents: 600,
			modality: "DAILY",
			userId: "john-doe-id-01",
			driverId: "fake-driver-id-01",
			routeId: "fake-route-01",
			vehicleId: "fake-vehicle-id-01",
		});

		expect(freight.id).toEqual(expect.any(String));
		expect(freightsRepository.items[0].companyId).toEqual("company-id-01");
		expect(freightsRepository.items[0].freightAmountInCents).toEqual(60000);
		expect(financeTransactionsRepository.items[0].amountInCents).toEqual(60000);
		expect(financeTransactionsRepository.items[0].paymentMethod).toStrictEqual(
			"PIX"
		);
	});

	it("not should be able to register a freight with the a creator role that is different between operational, manager or admin", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			companyId: "company-id-01",
			userId: user.id,
			sector: "Diretoria",
			role: "COMERCIAL",
		});

		expect(() =>
			sut.execute({
				date: new Date(),
				paymentDate: new Date(),
				type: "FRACTIONAL",
				deliveriesQuantity: 12,
				pickupsQuantity: 5,
				totalWeightOfDeliveries: 2400,
				totalWeightOfPickups: 1000,
				freightAmountInCents: 450,
				modality: "DAILY",
				userId: user.id,
				driverId: "fake-driver-id-01",
				routeId: "fake-route-01",
				vehicleId: "fake-vehicle-id-01",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
		expect(financeTransactionsRepository.items).toHaveLength(0);
	});

	it("not should be able to register a freight with a date less than the current date", async () => {
		expect(() =>
			sut.execute({
				date: new Date("2024-07-15 09:00:00"),
				paymentDate: new Date(),
				type: "FRACTIONAL",
				deliveriesQuantity: 12,
				pickupsQuantity: 5,
				totalWeightOfDeliveries: 2400,
				totalWeightOfPickups: 1000,
				freightAmountInCents: 580,
				modality: "DAILY",
				userId: "john-doe-id-01",
				driverId: "fake-driver-id-01",
				routeId: "fake-route-01",
				vehicleId: "fake-vehicle-id-01",
			})
		).rejects.toBeInstanceOf(BadRequestError);
		expect(financeTransactionsRepository.items).toHaveLength(0);
	});

	it("not should be able to register a freight with a payment date less than the current date", async () => {
		expect(() =>
			sut.execute({
				date: new Date(),
				paymentDate: new Date("2024-07-15 09:00:00"),
				type: "FRACTIONAL",
				deliveriesQuantity: 12,
				pickupsQuantity: 5,
				totalWeightOfDeliveries: 2400,
				totalWeightOfPickups: 1000,
				freightAmountInCents: 580,
				modality: "DAILY",
				userId: "john-doe-id-01",
				driverId: "fake-driver-id-01",
				routeId: "fake-route-01",
				vehicleId: "fake-vehicle-id-01",
			})
		).rejects.toBeInstanceOf(BadRequestError);
		expect(financeTransactionsRepository.items).toHaveLength(0);
	});
});
