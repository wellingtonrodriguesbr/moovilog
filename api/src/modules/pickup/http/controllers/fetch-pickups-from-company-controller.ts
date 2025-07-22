import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeFetchPickupsFromCompanyUseCase } from "@/modules/pickup/use-cases/factories/make-fetch-pickups-from-company-use-case";

import z from "zod";

export class FetchPickupsFromCompanyController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const fetchPickupsFromCompanyParamsSchema = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = fetchPickupsFromCompanyParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const fetchPickupsFromCompanyUseCase = makeFetchPickupsFromCompanyUseCase();
      const { pickups } = await fetchPickupsFromCompanyUseCase.execute({
        companyId,
        userId,
      });

      reply.status(200).send({ pickups });
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
