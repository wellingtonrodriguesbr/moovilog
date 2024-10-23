import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import {
	ICompanyMember,
	ICompanyMemberRoles,
} from "@/interfaces/company-member";
import { NotAllowedError } from "./errors/not-allowed-error";
import { UsersRepository } from "@/repositories/users-repository";
import { AuthLinksRepository } from "@/repositories/auth-links-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { generateRamdonCode } from "@/utils/generate-random-code";
import { env } from "@/env";
import { EmailDetails, EmailQueue } from "@/utils/email-queue";

import SendInvitationToCompanyMemberTemplate from "@/mail/templates/send-invitation-to-company-member-template";

interface SendInvitationToCompanyMemberUseCaseRequest {
	name: string;
	email: string;
	sector: string;
	role: ICompanyMemberRoles;
	companyMemberId: string;
}

interface SendInvitationToCompanyMemberUseCaseResponse {
	companyMember: ICompanyMember;
}

export class SendInvitationToCompanyMemberUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private companyMembersRepository: CompanyMembersRepository,
		private authLinksRepository: AuthLinksRepository
	) {}

	async execute({
		name,
		email,
		sector,
		role,
		companyMemberId,
	}: SendInvitationToCompanyMemberUseCaseRequest): Promise<SendInvitationToCompanyMemberUseCaseResponse> {
		const member =
			await this.companyMembersRepository.findById(companyMemberId);

		if (!member) {
			throw new ResourceNotFoundError("Creator not found");
		}

		if (member.role !== "ADMIN" && member.role !== "MANAGER") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			const memberAlreadyExists =
				await this.companyMembersRepository.findMemberInCompany(
					userAlreadyExists.id,
					member.companyId
				);

			if (memberAlreadyExists) {
				throw new CompanyMemberAlreadyExistsError();
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
			companyId: member.companyId,
			userId: user.id,
			sector,
			role,
		});

		const code = generateRamdonCode();
		const link = `${env.WEBSITE_DOMAIN_URL}/concluir-cadastro?codigo=${code}`;

		const emailQueue = new EmailQueue(500);

		const emailDetails: EmailDetails = {
			from: env.SENDER_EMAIL,
			to: [email],
			subject: "Boas-vindas a plataforma do Moovilog",
			react: SendInvitationToCompanyMemberTemplate({
				userName: name,
				userEmail: email,
				authLink: link,
			}),
		};

		emailQueue.enqueue(emailDetails);

		await this.authLinksRepository.create({
			code,
		});

		return { companyMember };
	}
}
