import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterCompanyAreaServiceUseCase } from "@/use-cases/factories/make-register-company-area-service-use-case";

import z from "zod";

export class RegisterCompanyAreaServiceController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerCompanyAreaServiceBodySchema = z.object({
			stateAcronyms: z.array(z.string()),
			areaIds: z.array(z.string()),
		});

		const { stateAcronyms, areaIds } =
			registerCompanyAreaServiceBodySchema.parse(req.body);

		const userId = req.user.sub;

		try {
			const registerCompanyAreaServiceUseCase =
				makeRegisterCompanyAreaServiceUseCase();
			await registerCompanyAreaServiceUseCase.execute({
				stateAcronyms,
				areaIds,
				userId,
			});

			reply.status(201).send({ ok: true });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}

			throw error;
		}
	}
}
