import { FastifyReply, FastifyRequest } from "fastify";
import { registerCompanyMemberUseCase } from "@/use-cases/register-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "@/use-cases/errors/company-member-already-exists-error";

import z from "zod";

export async function registerCompanyMemberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyMemberBodySchema = z.object({
    companyId: z.string(),
  });

  const registerCompanyMemberParamsSchema = z.object({
    memberId: z.string(),
  });

  const { companyId } = registerCompanyMemberBodySchema.parse(req.body);
  const { memberId } = registerCompanyMemberParamsSchema.parse(req.params);

  try {
    const { companyMemberId } = await registerCompanyMemberUseCase({
      memberId,
      companyId,
    });

    reply.status(201).send({ companyMemberId });
  } catch (error) {
    if (error instanceof CompanyMemberAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
