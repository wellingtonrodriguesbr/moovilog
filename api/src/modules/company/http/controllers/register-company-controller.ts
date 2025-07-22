import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyAlreadyExistsError } from "@/modules/company/use-cases/errors/company-already-exists-error";
import { OwnerAlreadyHasACompanyError } from "@/modules/company/use-cases/errors/owner-already-has-a-company-error";
import { makeRegisterCompanyUseCase } from "@/modules/company/use-cases/factories/make-register-company-use-case";

import z from "zod";

export class RegisterCompanyController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const registerCompanyBodySchema = z.object({
      name: z.string(),
      documentNumber: z.string().min(14).max(14),
      size: z.enum(["MICRO", "SMALL", "MEDIUM", "BIG"]),
      ownerSector: z.string(),
    });

    const ownerId = req.user.sub;

    const { name, documentNumber, size, ownerSector } = registerCompanyBodySchema.parse(req.body);

    try {
      const registerCompanyUseCase = makeRegisterCompanyUseCase();
      const { company } = await registerCompanyUseCase.execute({
        ownerId,
        name,
        documentNumber,
        size,
        ownerSector,
      });

      reply.status(201).send({ company });
    } catch (error) {
      if (error instanceof OwnerAlreadyHasACompanyError) {
        reply.status(409).send({ message: error.message });
      }
      if (error instanceof CompanyAlreadyExistsError) {
        reply.status(409).send({ message: error.message });
      }

      throw error;
    }
  }
}
