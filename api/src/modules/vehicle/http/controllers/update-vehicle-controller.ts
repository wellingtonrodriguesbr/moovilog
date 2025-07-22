import { FastifyReply, FastifyRequest } from "fastify";
import { VehicleAlreadyExistsInCompanyError } from "@/modules/vehicle/use-cases/errors/vehicle-already-exists-in-company-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeUpdateVehicleUseCase } from "@/modules/vehicle/use-cases/factories/make-update-vehicle-use-case";

import z from "zod";

export class UpdateVehicleController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const updateVehicleParamsSchema = z.object({
      vehicleId: z.string().uuid(),
    });

    const updateVehicleBodySchema = z.object({
      plate: z.string().optional(),
      trailerPlate: z.string().optional(),
      year: z.number().optional(),
      category: z
        .enum([
          "UTILITY",
          "VAN",
          "LIGHT_TRUCKS",
          "STRAIGHT_TRUCKS",
          "TRUCKS",
          "QUAD_AXLE_TRUCKS",
          "SEMI_TRAILER",
          "B_TRAIN",
          "ROAD_TRAIN",
        ])
        .optional(),
      type: z.enum(["OWN", "AGGREGATE", "RENTED"]).optional(),
      body: z
        .enum([
          "CLOSED",
          "OPEN",
          "SIDER",
          "REFRIGERATED",
          "BUCKET",
          "TANK",
          "BULK_CARRIER",
          "LIVESTOCK",
          "FLATBED",
          "CONTAINER",
          "WOOD",
          "CAR_CARRIER",
        ])
        .optional(),
      fullLoadCapacity: z.number().optional(),
      brand: z.string().optional(),
      model: z.string().optional(),
    });

    const { vehicleId } = updateVehicleParamsSchema.parse(req.params);

    const { plate, trailerPlate, year, category, type, body, fullLoadCapacity, brand, model } =
      updateVehicleBodySchema.parse(req.body);

    const userId = req.user.sub;

    try {
      const updateVehicleUseCase = makeUpdateVehicleUseCase();
      await updateVehicleUseCase.execute({
        plate,
        trailerPlate,
        year,
        category,
        type,
        body,
        fullLoadCapacity,
        brand,
        model,
        userId,
        vehicleId,
      });

      reply.status(204).send();
    } catch (error) {
      if (error instanceof VehicleAlreadyExistsInCompanyError) {
        reply.status(409).send({ message: error.message });
      }
      if (error instanceof NotAllowedError) {
        reply.status(403).send({ message: error.message });
      }
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }

      throw error;
    }
  }
}
