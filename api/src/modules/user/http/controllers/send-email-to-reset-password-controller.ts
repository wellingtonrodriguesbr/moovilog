import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeSendEmailToResetPasswordUseCase } from "@/modules/user/use-cases/factories/make-send-email-to-reset-password-use-case";

import z from "zod";

export class SendEmailToResetPasswordController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const sendEmailToResetPasswordBodySchema = z.object({
			email: z.string().email(),
		});

		const { email } = sendEmailToResetPasswordBodySchema.parse(req.body);

		try {
			const sendEmailToResetPasswordUseCase =
				makeSendEmailToResetPasswordUseCase();
			await sendEmailToResetPasswordUseCase.execute({
				email,
			});

			reply.status(201).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}

			throw error;
		}
	}
}
