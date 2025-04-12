import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { CompanyAlreadyExistsError } from "@/modules/company/use-cases/errors/company-already-exists-error";
import { OwnerAlreadyHasACompanyError } from "@/modules/company/use-cases/errors/owner-already-has-a-company-error";
import { RegisterCompanyUseCase } from "@/modules/company/use-cases/register-company-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: RegisterCompanyUseCase;

describe("[MODULE]: Register company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new RegisterCompanyUseCase(
			companiesRepository,
			companyMembersRepository,
			usersRepository
		);

		await usersRepository.create({
			id: "john-doe-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "15999999999",
			extraData: {
				onboardingStep: "register_company",
			},
		});
	});

	it("should be able to register company", async () => {
		const { company } = await sut.execute({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-01",
			ownerSector: "Diretoria",
		});

		expect(company.id).toEqual(expect.any(String));
		expect(company.size).toEqual("MEDIUM");
	});

	it("should not be able to register company with an existing document number", async () => {
		await sut.execute({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-01",
			ownerSector: "Diretoria",
		});

		await expect(() =>
			sut.execute({
				name: "Company name",
				documentNumber: "12312312389899",
				size: "MEDIUM",
				ownerId: "john-doe-01",
				ownerSector: "Diretoria",
			})
		).rejects.toBeInstanceOf(CompanyAlreadyExistsError);
	});

	it("should not be able to register company if user already owns another company", async () => {
		await sut.execute({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-01",
			ownerSector: "Diretoria",
		});

		await expect(() =>
			sut.execute({
				name: "Company name",
				documentNumber: "12312312389891",
				size: "MEDIUM",
				ownerId: "john-doe-01",
				ownerSector: "Diretoria",
			})
		).rejects.toBeInstanceOf(OwnerAlreadyHasACompanyError);
	});
});
