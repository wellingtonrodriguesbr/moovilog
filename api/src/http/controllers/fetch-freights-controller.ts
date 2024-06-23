import { FastifyReply, FastifyRequest } from "fastify";
import { fetchFreightsUseCase } from "@/use-cases/fetch-freights-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function fetchFreightsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user.sub;

  try {
    const { freights } = await fetchFreightsUseCase({
      userId,
    });

    reply.status(200).send({ freights });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
