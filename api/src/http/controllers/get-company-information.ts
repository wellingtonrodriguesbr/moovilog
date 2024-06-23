import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

import { getCompanyInformationUseCase } from "@/use-cases/get-company-information";

export async function getCompanyInformationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user.sub;

  try {
    const { company, companyAddress } = await getCompanyInformationUseCase({
      userId,
    });

    reply.status(200).send({ company, companyAddress });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }
    throw error;
  }
}
