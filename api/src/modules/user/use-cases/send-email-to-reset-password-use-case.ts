import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";
import { generateRamdonCode } from "@/utils/generate-random-code";
import { env } from "@/env";
import { EmailDetails, EmailQueue } from "@/utils/email-queue";

import SendEmailToResetPasswordTemplate from "@/mail/templates/send-email-to-reset-password-template";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

interface SendEmailToResetPasswordUseCaseRequest {
	email: string;
}

type SendEmailToResetPasswordUseCaseResponse = void;

export class SendEmailToResetPasswordUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private tokensRepository: TokensRepository
	) {}

	async execute({
		email,
	}: SendEmailToResetPasswordUseCaseRequest): Promise<SendEmailToResetPasswordUseCaseResponse> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (!userAlreadyExists) {
			throw new ResourceNotFoundError("User not found");
		}

		const code = generateRamdonCode();
		const link = `${env.WEBSITE_DOMAIN_URL}/validacao-do-codigo?codigo=${code}&redirect=/redefinir-senha`;

		const emailQueue = new EmailQueue(500);

		const emailDetails: EmailDetails = {
			from: env.SENDER_EMAIL,
			to: [email],
			subject: "Seu link de redefinição de senha da plataforma do Moovilog",
			react: SendEmailToResetPasswordTemplate({
				userName: userAlreadyExists.name,
				userEmail: email,
				link,
			}),
		};

		emailQueue.enqueue(emailDetails);

		await this.tokensRepository.create({
			code,
			type: "RECOVER_PASSWORD",
			userId: userAlreadyExists.id,
		});
	}
}
