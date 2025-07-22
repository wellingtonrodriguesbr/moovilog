import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchCitiesFromRouteUseCase } from "@/modules/route/use-cases/factories/make-fetch-cities-from-route-use-case";

import z from "zod";

export class FetchCitiesFromRouteController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const fetchCitiesFromRouteParamsSchema = z.object({
      routeId: z.string().uuid(),
    });

    const { routeId } = fetchCitiesFromRouteParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const fetchCitiesFromRouteUseCase = makeFetchCitiesFromRouteUseCase();
      const { cities } = await fetchCitiesFromRouteUseCase.execute({
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
