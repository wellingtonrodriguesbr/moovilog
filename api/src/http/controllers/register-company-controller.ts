import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyAlreadyExistsError } from "@/use-cases/errors/company-already-exists-error";
import { makeRegisterCompanyUseCase } from "@/use-cases/factories/make-register-company-use-case";
import { Prisma } from "@prisma/client";

import z from "zod";

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
  const ownerId = req.user.sub;

  try {
    const registerCompanyUseCase = makeRegisterCompanyUseCase();
    const { company } = await registerCompanyUseCase.execute({
      ownerId,
      name,
      documentNumber,
      type,
      size,
    });

    reply.status(201).send({ company });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        reply.status(409).send({
          message:
            "User already owns a company. Conflict with existing resource.",
        });
      }
    }
    if (error instanceof CompanyAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
