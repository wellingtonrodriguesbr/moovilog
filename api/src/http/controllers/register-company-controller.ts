import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyAlreadyExistsError } from "@/use-cases/errors/company-already-exists-error";
import { registerCompanyUseCase } from "@/use-cases/register-company-use-case";

import z from "zod";

export async function registerCompanyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyBodySchema = z.object({
    documentNumber: z.string().min(14),
    type: z.enum(["HEADQUARTERS", "BRANCH", "AGENCY"]),
    size: z.string().min(8),
  });

  const { documentNumber, type, size } = registerCompanyBodySchema.parse(
    req.body
  );
  const userId = req.user.sub;

  try {
    const { company } = await registerCompanyUseCase({
      userId,
      documentNumber,
      type,
      size,
    });

    reply.status(201).send({ company });
  } catch (error) {
    if (error instanceof CompanyAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
