import { FastifyReply, FastifyRequest } from "fastify";
import { registerCompanyMemberUseCase } from "@/use-cases/register-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "@/use-cases/errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

import z, { string } from "zod";

export async function registerCompanyMemberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyMemberBodySchema = z.object({
    userId: z.string(),
    role: z
      .enum(["ADMIN", "FINANCIAL", "OPERATIONAL", "MEMBER"])
      .or(z.undefined()),
  });

  const { userId, role } = registerCompanyMemberBodySchema.parse(req.body);
  const creatorId = req.user.sub;

  try {
    const { companyMemberId } = await registerCompanyMemberUseCase({
      userId,
      creatorId,
      role,
    });

    reply.status(201).send({ companyMemberId });
  } catch (error) {
    if (error instanceof CompanyMemberAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
