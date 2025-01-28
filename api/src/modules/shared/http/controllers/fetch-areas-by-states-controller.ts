import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchAreasByStatesUseCase } from "@/modules/shared/use-cases/factories/make-fetch-areas-by-state-use-case";

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

		try {
			const fetchAreasByStatesUseCase = makeFetchAreasByStatesUseCase();
			const { areas } = await fetchAreasByStatesUseCase.execute({
				stateAcronyms: states,
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
