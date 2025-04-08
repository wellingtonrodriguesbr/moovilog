import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeCompleteRegistrationUseCase } from "@/modules/user/use-cases/factories/make-complete-registration-use-case";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";
import z from "zod";

export class CompleteRegistrationController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const completeRegistrationBodySchema = z.object({
			userId: z.string(),
			phone: z.string().min(11),
			newPassword: z.string().min(8),
			confirmNewPassword: z.string().min(8),
		});

		const { userId, phone, newPassword, confirmNewPassword } =
			completeRegistrationBodySchema.parse(req.body);

		try {
			const completeRegistrationUseCase = makeCompleteRegistrationUseCase();
			await completeRegistrationUseCase.execute({
				userId,
				phone,
				newPassword,
				confirmNewPassword,
			});

			reply.status(204).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			if (error instanceof UserAlreadyExistsError) {
				reply.status(409).send({ message: error.message });
			}
			throw error;
		}
	}
}
