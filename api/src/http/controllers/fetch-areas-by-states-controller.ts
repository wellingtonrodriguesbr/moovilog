import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchAreasByStatesUseCase } from "@/use-cases/factories/make-fetch-areas-by-state-use-case";

import z from "zod";

export class FetchAreasByStatesController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchAreasByStatesParamsSchema = z.object({
			states: z
				.string()
				.transform((states) =>
					states.split(",").map((s) => s.trim().toUpperCase())
				),
		});

		const { states } = fetchAreasByStatesParamsSchema.parse(req.query);

		const userId = req.user.sub;

		try {
			const fetchAreasByStatesUseCase = makeFetchAreasByStatesUseCase();
			const { areas } = await fetchAreasByStatesUseCase.execute({
				stateAcronyms: states,
				userId,
			});

			reply.status(200).send({ areas });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
