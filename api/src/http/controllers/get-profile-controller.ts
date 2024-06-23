import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";
import { getProfileUseCase } from "@/use-cases/get-profile-use-case";

export async function getProfileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user.sub;

  try {
    const { user } = await getProfileUseCase({
      userId,
    });

    reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }
    if (error instanceof UnauthorizedError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
