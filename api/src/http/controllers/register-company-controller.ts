import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyAlreadyExistsError } from "@/use-cases/errors/company-already-exists-error";
import { registerCompanyUseCase } from "@/use-cases/register-company-use-case";

import z from "zod";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

export async function registerCompanyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyBodySchema = z.object({
    name: z.string(),
    documentNumber: z.string().min(14).max(14),
    type: z.enum(["HEADQUARTERS", "BRANCH", "AGENCY"]),
    size: z.enum(["MICRO", "SMALL", "MEDIUM", "BIG"]),
  });

  const { name, documentNumber, type, size } = registerCompanyBodySchema.parse(
    req.body
  );
  const userId = req.user.sub;

  try {
    const { company } = await registerCompanyUseCase({
      userId,
      name,
      documentNumber,
      type,
      size,
    });

    reply.status(201).send({ company });
  } catch (error) {
    if (error instanceof CompanyAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
