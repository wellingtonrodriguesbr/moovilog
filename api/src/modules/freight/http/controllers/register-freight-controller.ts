import { FastifyReply, FastifyRequest } from "fastify";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeRegisterfreightUseCase } from "@/modules/freight/use-cases/factories/make-register-freight-use-case";

import z from "zod";

export class RegisterFreightController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerFreightBodySchema = z.object({
			type: z.enum(["FRACTIONAL", "DEDICATED", "EXPRESS", "TRANSFER"]),
			date: z.coerce.date(),
			paymentDate: z.coerce.date(),
			modality: z.enum([
				"DAILY",
				"PERCENTAGE",
				"PRODUCTIVITY",
				"FLAT_RATE",
				"WEIGHT_BASED",
				"DISTANCE_BASED",
				"TIME_BASED",
				"PER_STOP",
				"ZONE_BASED",
			]),
			observation: z.string().optional().nullable(),
			pickupsQuantity: z.coerce.number().optional(),
			deliveriesQuantity: z.coerce.number(),
			totalWeightOfPickups: z.coerce.number().optional(),
			totalWeightOfDeliveries: z.coerce.number(),
			freightAmountInCents: z.coerce.number(),
			driverId: z.string().uuid(),
			vehicleId: z.string().uuid(),
			routeId: z.string().uuid(),
		});

		const {
			type,
			date,
			paymentDate,
			modality,
			observation,
			pickupsQuantity,
			deliveriesQuantity,
			totalWeightOfPickups,
			totalWeightOfDeliveries,
			freightAmountInCents,
			driverId,
			vehicleId,
			routeId,
		} = registerFreightBodySchema.parse(req.body);

		console.log(date);

		const userId = req.user.sub;

		try {
			const registerFreightUseCase = makeRegisterfreightUseCase();
			const { freight } = await registerFreightUseCase.execute({
				type,
				date,
				paymentDate,
				modality,
				observation,
				pickupsQuantity,
				deliveriesQuantity,
				totalWeightOfPickups,
				totalWeightOfDeliveries,
				freightAmountInCents,
				userId,
				driverId,
				vehicleId,
				routeId,
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
}
