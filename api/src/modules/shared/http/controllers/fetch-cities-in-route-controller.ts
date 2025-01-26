import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchCitiesInRouteUseCase } from "@/modules/shared/use-cases/factories/make-fetch-cities-in-route-use-case";
import z from "zod";

export class FetchCitiesInRouteController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchCitiesInRouteParamsSchema = z.object({
			routeId: z.string().uuid(),
		});

		const { routeId } = fetchCitiesInRouteParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchCitiesInRouteUseCase = makeFetchCitiesInRouteUseCase();
			const { cities } = await fetchCitiesInRouteUseCase.execute({
				userId,
				routeId,
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
