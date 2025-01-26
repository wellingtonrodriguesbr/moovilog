import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { MemberAlreadyExistsInCompanyError } from "@/modules/company-member/use-cases/errors/member-already-exists-in-company";
import {
	ICompanyMember,
	ICompanyMemberRoles,
} from "@/modules/shared/interfaces/company-member";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";
import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { generateRamdonCode } from "@/utils/generate-random-code";
import { env } from "@/env";
import { EmailDetails, EmailQueue } from "@/utils/email-queue";

import SendInvitationToCompanyMemberTemplate from "@/mail/templates/send-invitation-to-company-member-template";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";

interface SendInvitationToCompanyMemberUseCaseRequest {
	name: string;
	email: string;
	sector: string;
	role: ICompanyMemberRoles;
	senderId: string;
	companyId: string;
}

interface SendInvitationToCompanyMemberUseCaseResponse {
	companyMember: ICompanyMember;
}

export class SendInvitationToCompanyMemberUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private tokensRepository: TokensRepository
	) {}

	async execute({
		name,
		email,
		sector,
		role,
		senderId,
		companyId,
	}: SendInvitationToCompanyMemberUseCaseRequest): Promise<SendInvitationToCompanyMemberUseCaseResponse> {
		const [sender, company] = await Promise.all([
			this.usersRepository.findById(senderId),
			this.companiesRepository.findById(companyId),
		]);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!sender) {
			throw new ResourceNotFoundError("Sender not found");
		}

		const senderInCompany =
			await this.companyMembersRepository.findMemberInCompany(
				senderId,
				companyId
			);

		if (!senderInCompany) {
			throw new ResourceNotFoundError("Sender not found in company");
		}

		if (
			senderInCompany.role !== "ADMIN" &&
			senderInCompany.role !== "MANAGER"
		) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			const memberAlreadyExists =
				await this.companyMembersRepository.findMemberInCompany(
					userAlreadyExists.id,
					senderInCompany.companyId
				);

			if (memberAlreadyExists) {
				throw new MemberAlreadyExistsInCompanyError();
			}

			throw new UserAlreadyExistsError(
				"Already exists a user with this same email address"
			);
		}

		const user = await this.usersRepository.create({
			name,
			email,
		});

		const companyMember = await this.companyMembersRepository.create({
			companyId: senderInCompany.companyId,
			userId: user.id,
			sector,
			role,
		});

		const code = generateRamdonCode();
		const link = `${env.WEBSITE_DOMAIN_URL}/validacao-do-codigo?codigo=${code}`;

		const emailQueue = new EmailQueue(500);

		const emailDetails: EmailDetails = {
			from: env.SENDER_EMAIL,
			to: [email],
			subject: "Seu convite para acessar a plataforma do Moovilog",
			react: SendInvitationToCompanyMemberTemplate({
				senderName: sender.name,
				userName: name,
				userEmail: email,
				authLink: link,
			}),
		};

		emailQueue.enqueue(emailDetails);

		await this.tokensRepository.create({
			code,
			type: "AUTH_LINK",
			userId: user.id,
		});

		return { companyMember };
	}
}
