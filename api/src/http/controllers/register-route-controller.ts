import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterRouteUseCase } from "@/use-cases/factories/make-register-route-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";

import z from "zod";

export class RegisterRouteController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerRouteBodySchema = z.object({
			name: z.string(),
			citiesIds: z.array(z.string()),
		});

		const userId = req.user.sub;

		const { name, citiesIds } = registerRouteBodySchema.parse(req.body);

		try {
			const registerRouteUseCase = makeRegisterRouteUseCase();
			const { route } = await registerRouteUseCase.execute({
				name,
				citiesIds,
				userId,
			});

			reply.status(201).send({ route });
		} catch (error) {
			if (error instanceof BadRequestError) {
				reply.status(400).send({ message: error.message });
			}
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}

			throw error;
		}
	}
}
