import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { makeValidateTokenUseCase } from "@/modules/shared/use-cases/factories/make-validate-token-use-case";

import z from "zod";

export class ValidateTokenController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const validateTokenBodySchema = z.object({
			code: z.string(),
		});

		const { code } = validateTokenBodySchema.parse(req.params);

		try {
			const validateTokenUseCase = makeValidateTokenUseCase();
			const { userId } = await validateTokenUseCase.execute({
				code,
			});

			reply.status(200).send({ userId });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			if (error instanceof BadRequestError) {
				reply.status(400).send({ message: error.message });
			}

			throw error;
		}
	}
}
