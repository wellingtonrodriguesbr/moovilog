import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchRoutesFromCompanyUseCase } from "@/modules/route/use-cases/factories/make-fetch-routes-from-company-use-case";
import z from "zod";

export class FetchRoutesFromCompanyController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const fetchRoutesFromCompanyParamsSchema = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = fetchRoutesFromCompanyParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const fetchRoutesFromCompanyUseCase = makeFetchRoutesFromCompanyUseCase();
      const { routes } = await fetchRoutesFromCompanyUseCase.execute({
        userId,
        companyId,
      });

      reply.status(200).send({ routes });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
