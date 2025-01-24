import { FastifyReply, FastifyRequest } from "fastify";
import { VehicleAlreadyExistsInCompanyError } from "@/modules/vehicle/use-cases/errors/vehicle-already-exists-in-company-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeRegisterVehicleUseCase } from "@/modules/vehicle/use-cases/factories/make-register-vehicle-use-case";

import z from "zod";

export class RegisterVehicleController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerVehicleBodySchema = z.object({
			plate: z.string(),
			year: z.number(),
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
			fullLoadCapacity: z.number(),
			brand: z.string(),
			model: z.string(),
		});

		const {
			plate,
			year,
			category,
			type,
			body,
			fullLoadCapacity,
			brand,
			model,
		} = registerVehicleBodySchema.parse(req.body);

		const userId = req.user.sub;

		try {
			const registerVehicleUseCase = makeRegisterVehicleUseCase();
			const { vehicle } = await registerVehicleUseCase.execute({
				plate,
				year,
				category,
				type,
				body,
				fullLoadCapacity,
				brand,
				model,
				userId,
			});

			reply.status(201).send({ vehicle });
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
