import { FastifyReply, FastifyRequest } from "fastify";
import { registerDriverBankDetailsUseCase } from "@/use-cases/register-driver-bank-details-use-case";

import z from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

export async function registerDriverBankDetailsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerDriverBankDetailsBodySchema = z.object({
    financialInstitution: z.string(),
    accountType: z.enum([
      "CURRENT_ACCOUNT",
      "SALARY_ACCOUNT",
      "SAVINGS_ACCOUNT",
    ]),
    agency: z.number(),
    accountNumber: z.number(),
    pixKey: z.string().optional().nullable(),
    driverId: z.string(),
  });

  const userId = req.user.sub;

  const {
    financialInstitution,
    accountType,
    accountNumber,
    agency,
    pixKey,
    driverId,
  } = registerDriverBankDetailsBodySchema.parse(req.body);

  try {
    const { bankDetailsId } = await registerDriverBankDetailsUseCase({
      financialInstitution,
      accountType,
      accountNumber,
      agency,
      pixKey,
      driverId,
      userId,
    });

    reply.status(201).send({ bankDetailsId });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }
    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
