import { FastifyReply, FastifyRequest } from "fastify";
import { registerVehicleUseCase } from "@/use-cases/register-vehicle-use-case";
import { VehicleAlreadyExistsError } from "@/use-cases/errors/vehicle-already-exists-error";

import z from "zod";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function registerVehicleController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerVehicleBodySchema = z.object({
    plate: z.string(),
    category: z.enum([
      "UTILITY",
      "VAN",
      "LIGHT_TRUCKS",
      "STRAIGHT_TRUCKS",
      "TRUCKS",
      "QUAD_AXLE_TRUCKS",
      "SEMI_TRAILER",
      "TANDEM_AXLE_TRUCK",
    ]),
    type: z.enum(["OWN", "OUTSOURCED", "RENTED"]),
    body: z.enum(["CLOSED", "OPEN", "SIDER", "REFRIGERATED", "BUCKET"]),
    fullLoadCapacity: z.string(),
    driverId: z.string(),
  });

  const { plate, category, type, body, fullLoadCapacity, driverId } =
    registerVehicleBodySchema.parse(req.body);

  const creatorId = req.user.sub;

  try {
    const { vehicle } = await registerVehicleUseCase({
      plate,
      category,
      type,
      body,
      fullLoadCapacity,
      driverId,
      creatorId,
    });

    reply.status(201).send({ vehicle });
  } catch (error) {
    if (error instanceof VehicleAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }

    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
