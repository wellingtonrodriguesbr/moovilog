import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeGetFreightDetailsUseCase } from "@/modules/freight/use-cases/factories/make-get-freight-details-use-case";

import z from "zod";

export class GetFreightDetailsController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const getFreightDetailsParamsSchema = z.object({
      companyId: z.string().uuid(),
      freightId: z.string().uuid(),
    });

    const { companyId, freightId } = getFreightDetailsParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const getFreightDetailsUseCase = makeGetFreightDetailsUseCase();
      const { freight } = await getFreightDetailsUseCase.execute({
        companyId,
        userId,
        freightId,
      });

      reply.status(200).send({ freight });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
