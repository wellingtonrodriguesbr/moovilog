import { FastifyReply, FastifyRequest } from "fastify";
import { getFreightFromDriverUseCase } from "@/use-cases/get-freight-information-from-driver";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

import z from "zod";

export async function getFreightFromDriverController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getFreightFromDriverParamsSchema = z.object({
    freightId: z.string(),
  });

  const driverId = req.user.sub;
  const { freightId } = getFreightFromDriverParamsSchema.parse(req.params);

  try {
    const { freightInformation } = await getFreightFromDriverUseCase({
      driverId,
      freightId,
    });

    reply.status(200).send({ freightInformation });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }
    if (error instanceof UnauthorizedError) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
