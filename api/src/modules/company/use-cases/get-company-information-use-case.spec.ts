import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { GetCompanyInformationUseCase } from "@/modules/company/use-cases/get-company-information-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;

let sut: GetCompanyInformationUseCase;

describe("[MODULE]: Get company information use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();

		sut = new GetCompanyInformationUseCase(
			usersRepository,
			companyMembersRepository,
			companiesRepository
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			extraData: {
				onboardingStep: "complete_onboarding",
			},
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
				permissions: ["SUPER_ADMIN"],
			},
		});
	});

	it("should be able to get company information", async () => {
		const { company } = await sut.execute({
			userId: "john-doe-id-01",
		});

		expect(company.id).toEqual("company-id-01");
		expect(company.size).toEqual("MEDIUM");
	});

	it("not should be able to get company information if the user is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-02",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("not should be able to get company information if the onboarding is not complete", async () => {
		await usersRepository.create({
			id: "john-doe-id-02",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			extraData: {
				onboardingStep: "register_company",
			},
		});

		await companiesRepository.create({
			id: "company-id-02",
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-02",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			extraData: {
				permissions: ["SUPER_ADMIN"],
			},
		});

		await expect(() =>
			sut.execute({
				userId: "john-doe-id-02",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
