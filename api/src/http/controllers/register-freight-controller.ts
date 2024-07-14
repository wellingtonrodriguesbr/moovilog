import { FastifyReply, FastifyRequest } from "fastify";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterfreightUseCase } from "@/use-cases/factories/make-register-freight-use-case";

import z from "zod";

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
    const registerFreightUseCase = makeRegisterfreightUseCase();
    const { freight } = await registerFreightUseCase.execute({
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
    if (error instanceof NotAllowedError) {
      reply.status(403).send({ message: error.message });
    }
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
