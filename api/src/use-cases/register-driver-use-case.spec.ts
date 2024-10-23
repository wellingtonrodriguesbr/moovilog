import { beforeEach, describe, expect, it } from "vitest";
import { RegisterDriverUseCase } from "./register-driver-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let sut: RegisterDriverUseCase;

describe("Register driver use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		driversRepository = new InMemoryDriversRepository();

		sut = new RegisterDriverUseCase(
			companyMembersRepository,
			driversRepository
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
			ownerId: "john-doe-id-01",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			role: "ADMIN",
		});
	});

	it("should be able to register driver", async () => {
		const { driver } = await sut.execute({
			name: "John Doe Driver",
			documentNumber: "12312312312",
			phone: "11999999999",
			type: "AGGREGATE",
			companyMemberId: "company-member-id-01",
		});

		expect(driver.id).toEqual(expect.any(String));
		expect(driversRepository.items).toHaveLength(1);
		expect(driversRepository.items[0].creatorId).toEqual(
			"company-member-id-01"
		);
	});

	it("should not be able to register driver with an existing same document number in company", async () => {
		await sut.execute({
			name: "John Doe Driver",
			documentNumber: "12312312312",
			phone: "11999999999",
			type: "AGGREGATE",
			companyMemberId: "company-member-id-01",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe Driver",
				documentNumber: "12312312312",
				phone: "11999999999",
				type: "AGGREGATE",
				companyMemberId: "company-member-id-01",
			})
		).rejects.toBeInstanceOf(DriverAlreadyExistsError);
	});

	it("should not be able to register the driver with the a creator role that is different between manager or admin", async () => {
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

		expect(() =>
			sut.execute({
				name: "John Doe Driver",
				documentNumber: "12312312313",
				phone: "11999999999",
				type: "AGGREGATE",
				companyMemberId: member.id,
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
