import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchCitiesByAreaUseCase } from "@/modules/shared/use-cases/factories/make-fetch-cities-by-area-use-case";

import z from "zod";

export class FetchCitiesByAreaController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchCitiesByAreaControllerBodySchema = z.object({
			areaCode: z.coerce.number(),
		});

		const { areaCode } = fetchCitiesByAreaControllerBodySchema.parse(
			req.params
		);

		try {
			const fetchCitiesByAreaUseCase = makeFetchCitiesByAreaUseCase();
			const { cities } = await fetchCitiesByAreaUseCase.execute({
				areaCode,
			});

			reply.status(200).send({ cities });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}

			throw error;
		}
	}
}
