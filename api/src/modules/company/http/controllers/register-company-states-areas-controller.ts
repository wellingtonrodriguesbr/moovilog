import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeRegisterCompanyStatesAreasUseCase } from "@/modules/company/use-cases/factories/make-register-company-states-areas-use-case";

import z from "zod";

export class RegisterCompanyStatesAreasController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerCompanyStatesAreasBodySchema = z.object({
			stateAcronyms: z.array(z.string()),
			areaIds: z.array(z.string()),
		});

		const { stateAcronyms, areaIds } =
			registerCompanyStatesAreasBodySchema.parse(req.body);

		const userId = req.user.sub;

		try {
			const registerCompanyStatesAreasUseCase =
				makeRegisterCompanyStatesAreasUseCase();
			await registerCompanyStatesAreasUseCase.execute({
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
