import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { fetchCompanyMembersUseCase } from "@/use-cases/fetch-company-members-use-case";

export async function fetchCompanyMembersController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user.sub;

  try {
    const { companyMembers } = await fetchCompanyMembersUseCase({
      userId,
    });

    reply.status(200).send({ companyMembers });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
