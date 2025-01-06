import { FastifyReply, FastifyRequest } from "fastify";
import { makeValidateAuthLinkUseCase } from "@/use-cases/factories/make-validate-auth-link-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";

import z from "zod";

export class ValidateAuthLinkController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const validateAuthLinkBodySchema = z.object({
			code: z.string(),
		});

		const { code } = validateAuthLinkBodySchema.parse(req.params);

		try {
			const validateAuthLinkUseCase = makeValidateAuthLinkUseCase();
			const { userId } = await validateAuthLinkUseCase.execute({
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
