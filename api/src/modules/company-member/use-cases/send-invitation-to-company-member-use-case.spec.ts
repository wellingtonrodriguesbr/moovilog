import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryTokensRepository } from "@/modules/shared/repositories/in-memory/in-memory-tokens-repository";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { MemberAlreadyExistsInCompanyError } from "@/modules/company-member/use-cases/errors/member-already-exists-in-company";
import { SendInvitationToCompanyMemberUseCase } from "@/modules/company-member/use-cases/send-invitation-to-company-member-use-case";
import { PermissionService } from "@/services/permission-service";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let tokensRepository: InMemoryTokensRepository;
let permissionService: PermissionService;
let sut: SendInvitationToCompanyMemberUseCase;

describe("[MODULE]: Send invitation to company member use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		tokensRepository = new InMemoryTokensRepository();
		permissionService = new PermissionService(companyMembersRepository);
		sut = new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMembersRepository,
			companiesRepository,
			tokensRepository,
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
				permissions: ["ADMIN"],
			},
		});
	});

	it("should be able to send invitation to a member", async () => {
		const { companyMember } = await sut.execute({
			name: "John Doe",
			email: "johndoe-member@example.com",
			senderId: "john-doe-id-01",
			companyId: "company-id-01",
			permissions: ["ADMIN"],
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
			permissions: ["ADMIN"],
			sector: "Gerência",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe-member@example.com",
				senderId: "john-doe-id-01",
				companyId: "company-id-01",
				permissions: ["ADMIN"],
				sector: "Vendas",
			})
		).rejects.toBeInstanceOf(MemberAlreadyExistsInCompanyError);
	});

	it("should not be possible to send invitations if the creator does not have the necessary permissions", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			userId: user.id,
			companyId: "company-id-01",
			extraData: {
				permissions: ["MANAGE_SHIPMENTS_AND_PICKUPS"],
			},
			sector: "Financeiro",
		});

		expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe-member@example.com",
				senderId: user.id,
				companyId: "company-id-01",
				permissions: ["VIEW_RESOURCES_AND_SUPPLIES"],
				sector: "Ajudante geral",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
