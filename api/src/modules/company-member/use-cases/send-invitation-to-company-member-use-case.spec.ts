import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryTokensRepository } from "@/modules/shared/repositories/in-memory/in-memory-tokens-repository";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { MemberAlreadyExistsInCompanyError } from "@/modules/company-member/use-cases/errors/member-already-exists-in-company";
import { SendInvitationToCompanyMemberUseCase } from "@/modules/company-member/use-cases/send-invitation-to-company-member-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let tokensRepository: InMemoryTokensRepository;
let sut: SendInvitationToCompanyMemberUseCase;

describe("[MODULE]: Send invitation to company member use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		tokensRepository = new InMemoryTokensRepository();
		sut = new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMembersRepository,
			companiesRepository,
			tokensRepository
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

	it("should be able to send invitation to a member", async () => {
		const { companyMember } = await sut.execute({
			name: "John Doe",
			email: "johndoe-member@example.com",
			senderId: "john-doe-id-01",
			companyId: "company-id-01",
			role: "MANAGER",
			sector: "Gerência",
		});

		expect(companyMember.id).toEqual(expect.any(String));
		expect(companyMember.status).toEqual("PENDING");
		expect(tokensRepository.items.length).toEqual(1);
	});

	it("should not be able to send invitation to member if already exists with same email", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe-member@example.com",
			senderId: "john-doe-id-01",
			companyId: "company-id-01",
			role: "MANAGER",
			sector: "Gerência",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe-member@example.com",
				senderId: "john-doe-id-01",
				companyId: "company-id-01",
				role: "COMERCIAL",
				sector: "Vendas",
			})
		).rejects.toBeInstanceOf(MemberAlreadyExistsInCompanyError);
	});

	it("should not be able to send invitations to members with a creator role other than admin", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			userId: user.id,
			companyId: "company-id-01",
			role: "FINANCIAL",
			sector: "Financeiro",
		});

		expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe-member@example.com",
				senderId: user.id,
				companyId: "company-id-01",
				role: "OPERATIONAL",
				sector: "Ajudante geral",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
