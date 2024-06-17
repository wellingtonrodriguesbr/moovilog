import { FastifyReply, FastifyRequest } from "fastify";
import { fetchFreightFromDriverUseCase } from "@/use-cases/fetch-freight-from-driver";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function fetchFreightFromDriverController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const driverId = req.user.sub;

  try {
    const { freights } = await fetchFreightFromDriverUseCase({
      driverId,
    });

    reply.status(200).send({ freights });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
