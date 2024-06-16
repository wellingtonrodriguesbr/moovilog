import { FastifyReply, FastifyRequest } from "fastify";
import { registerCompanyMemberUseCase } from "@/use-cases/register-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "@/use-cases/errors/company-member-already-exists-error";

import z from "zod";

export async function registerCompanyMemberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyMemberBodySchema = z.object({
    userEmail: z.string(),
  });

  const { userEmail } = registerCompanyMemberBodySchema.parse(req.body);

  try {
    const { companyMemberId } = await registerCompanyMemberUseCase({
      userEmail,
    });

    reply.status(201).send({ companyMemberId });
  } catch (error) {
    if (error instanceof CompanyMemberAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
