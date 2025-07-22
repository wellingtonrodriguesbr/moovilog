import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeFetchFreightsFromCompanyUseCase } from "@/modules/freight/use-cases/factories/make-fetch-freights-from-company-use-case";

import z from "zod";

export class FetchFreightsFromCompanyController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const fetchFreightsFromCompanyParamsSchema = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = fetchFreightsFromCompanyParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const fetchFreightsFromCompanyUseCase = makeFetchFreightsFromCompanyUseCase();
      const { freights, summary } = await fetchFreightsFromCompanyUseCase.execute({
        companyId,
        userId,
      });

      reply.status(200).send({ freights, summary });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      if (error instanceof NotAllowedError) {
        reply.status(403).send({ message: error.message });
      }
      throw error;
    }
  }
}
