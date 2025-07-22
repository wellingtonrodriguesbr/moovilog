import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeGetCompanyAddressUseCase } from "@/modules/company/use-cases/factories/make-get-company-address-use-case";
import z from "zod";

export class GetCompanyAddressController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const getCompanyAddressParamsSchema = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = getCompanyAddressParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const getCompanyAddressUseCase = makeGetCompanyAddressUseCase();
      const { companyAddress } = await getCompanyAddressUseCase.execute({
        userId,
        companyId,
      });

      reply.status(200).send({ companyAddress });
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
