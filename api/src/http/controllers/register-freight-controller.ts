import { FastifyReply, FastifyRequest } from "fastify";
import { registerFreightUseCase } from "@/use-cases/register-freight-use-case";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

import z from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function registerFreightController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerFreightBodySchema = z.object({
    type: z.enum(["FRACTIONAL", "DIRECT", "DEDICATED"]),
    date: z.coerce.date(),
    observation: z.string().optional().nullable(),
    pickupsQuantity: z.number(),
    deliveriesQuantity: z.number(),
    totalWeightOfPickups: z.number(),
    totalWeightOfDeliveries: z.number(),
    freightAmountInCents: z.number(),
    citiesIds: z.array(z.string()),
    driverId: z.string(),
  });

  const {
    type,
    date,
    observation,
    pickupsQuantity,
    deliveriesQuantity,
    totalWeightOfPickups,
    totalWeightOfDeliveries,
    freightAmountInCents,
    citiesIds,
    driverId,
  } = registerFreightBodySchema.parse(req.body);

  const creatorId = req.user.sub;

  try {
    const { freight } = await registerFreightUseCase({
      type,
      date,
      observation,
      pickupsQuantity,
      deliveriesQuantity,
      totalWeightOfPickups,
      totalWeightOfDeliveries,
      freightAmountInCents,
      citiesIds,
      driverId,
      creatorId,
    });

    reply.status(201).send({ freight });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
