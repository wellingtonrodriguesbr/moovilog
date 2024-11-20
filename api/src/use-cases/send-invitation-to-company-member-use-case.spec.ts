import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryAuthLinksRepository } from "@/repositories/in-memory/in-memory-auth-links-repository";
import { SendInvitationToCompanyMemberUseCase } from "./send-invitation-to-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let authLinksRepository: InMemoryAuthLinksRepository;
let sut: SendInvitationToCompanyMemberUseCase;

describe("Send invitation to company member use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		authLinksRepository = new InMemoryAuthLinksRepository();
		sut = new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMembersRepository,
			authLinksRepository
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
			role: "MANAGER",
			sector: "Gerência",
		});

		expect(companyMember.id).toEqual(expect.any(String));
		expect(companyMember.status).toEqual("PENDING");
		expect(authLinksRepository.items.length).toEqual(1);
	});

	it("should not be possible to send invitation to member if already exists with same email", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe-member@example.com",
			senderId: "john-doe-id-01",
			role: "MANAGER",
			sector: "Gerência",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe-member@example.com",
				senderId: "john-doe-id-01",
				role: "COMERCIAL",
				sector: "Vendas",
			})
		).rejects.toBeInstanceOf(CompanyMemberAlreadyExistsError);
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
				role: "OPERATIONAL",
				sector: "Ajudante geral",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
