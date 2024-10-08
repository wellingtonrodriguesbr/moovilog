import { beforeEach, describe, expect, it } from "vitest";
import { RegisterDriverUseCase } from "./register-driver-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { compare } from "bcryptjs";

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
			type: "HEADQUARTERS",
			ownerId: "john-doe-id-01",
		});

		await companyMembersRepository.create({
			companyId: "company-id-01",
			memberId: "john-doe-id-01",
			role: "ADMIN",
		});
	});

	it("should be able to register driver", async () => {
		const { driver } = await sut.execute({
			name: "John Doe Driver",
			password: "123123123",
			documentNumber: "12312312312",
			phone: "11999999999",
			creatorId: "john-doe-id-01",
		});

		expect(driver.id).toEqual(expect.any(String));
	});

	it("should not be able to register driver with an existing same document number", async () => {
		await sut.execute({
			name: "John Doe Driver",
			password: "123123123",
			documentNumber: "12312312312",
			phone: "11999999999",
			creatorId: "john-doe-id-01",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe Driver",
				password: "123123123",
				documentNumber: "12312312312",
				phone: "11999999999",
				creatorId: "john-doe-id-01",
			})
		).rejects.toBeInstanceOf(DriverAlreadyExistsError);
	});

	it("should not be able to register the driver with the a creator role that is different between operational or admin", async () => {
		const member = await companyMembersRepository.create({
			memberId: "john-doe-id-02",
			companyId: "company-id-01",
			role: "FINANCIAL",
		});

		expect(() =>
			sut.execute({
				name: "John Doe Driver",
				password: "123123123",
				documentNumber: "12312312312",
				phone: "11999999999",
				creatorId: member.memberId,
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});

	it("should be able possible to generate a hash of the driver password in the registry", async () => {
		const { driver } = await sut.execute({
			name: "John Doe Driver",
			password: "123123123",
			documentNumber: "12312312312",
			phone: "11999999999",
			creatorId: "john-doe-id-01",
		});

		const isPasswordCorrectlyHashed = await compare(
			"123123123",
			driver.password
		);
		expect(isPasswordCorrectlyHashed).toBe(true);
	});
});
