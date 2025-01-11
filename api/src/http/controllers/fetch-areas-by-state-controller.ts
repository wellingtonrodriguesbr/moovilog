import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchAreasByStateUseCase } from "@/use-cases/factories/make-fetch-areas-by-state-use-case";

import z from "zod";

export class FetchAreasByStateController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchAreasByStateParamsSchema = z.object({
			stateAcronym: z.string(),
		});

		const { stateAcronym } = fetchAreasByStateParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchAreasByStateUseCase = makeFetchAreasByStateUseCase();
			const { areas } = await fetchAreasByStateUseCase.execute({
				stateAcronym,
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
