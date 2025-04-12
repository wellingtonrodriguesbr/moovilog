import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { FetchMembersFromCompanyUseCase } from "@/modules/company-member/use-cases/fetch-members-from-company-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { ICompanyMemberExtraData } from "@/modules/company-member/interfaces/company-member";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: FetchMembersFromCompanyUseCase;

describe("[MODULE]: Fetch members from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new FetchMembersFromCompanyUseCase(
			companyMembersRepository,
			companiesRepository
		);

		await usersRepository.create({
			id: "john-doe-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			extraData: {
				onboardingStep: "onboarding_complete",
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
			companyId: "company-id-01",
			userId: "john-doe-01",
			sector: "Gerência",
			extraData: {
				permissions: ["ADMIN"],
			},
		});
	});

	it("should be able to fetch company members", async () => {
		const { companyMembers } = await sut.execute({
			userId: "john-doe-01",
			companyId: "company-id-01",
		});

		expect(companyMembersRepository.items).toHaveLength(1);
		expect(
			(companyMembers[0].extraData as ICompanyMemberExtraData).permissions
		).includes("ADMIN");
	});

	it("should not be able to fetch company members if user is not a company member", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-02",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
