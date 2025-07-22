import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeUpdateVehicleStatusUseCase } from "@/modules/vehicle/use-cases/factories/make-update-vehicle-status-use-case";

import z from "zod";

export class UpdateVehicleStatusController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const updateVehicleStatusBodySchema = z.object({
      status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RESERVED", "BROKEN"]),
    });

    const updateVehicleStatusParamsSchema = z.object({
      vehicleId: z.string().uuid(),
    });

    const { status } = updateVehicleStatusBodySchema.parse(req.body);

    const { vehicleId } = updateVehicleStatusParamsSchema.parse(req.params);

    const userId = req.user.sub;

    try {
      const updateVehicleStatusUseCase = makeUpdateVehicleStatusUseCase();
      await updateVehicleStatusUseCase.execute({
        vehicleId,
        userId,
        status,
      });

      reply.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      if (error instanceof NotAllowedError) {
        reply.status(403).send({ message: error.message });
      }
      throw error;
    }
  }
}
