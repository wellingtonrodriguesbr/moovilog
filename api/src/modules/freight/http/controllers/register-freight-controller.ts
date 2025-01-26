import { FastifyReply, FastifyRequest } from "fastify";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterfreightUseCase } from "@/modules/freight/use-cases/factories/make-register-freight-use-case";

import z from "zod";

export class RegisterFreightController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerFreightBodySchema = z.object({
			type: z.enum(["FRACTIONAL", "DIRECT", "DEDICATED"]),
			date: z.coerce.date(),
			modality: z.enum(["DAILY", "PERCENTAGE", "PRODUCTIVITY"]),
			observation: z.string().optional().nullable(),
			pickupsQuantity: z.number().optional(),
			deliveriesQuantity: z.number(),
			totalWeightOfPickups: z.number().optional(),
			totalWeightOfDeliveries: z.number(),
			freightAmountInCents: z.number(),
			companyMemberId: z.string().uuid(),
			driverId: z.string().uuid(),
			vehicleId: z.string().uuid(),
			routeId: z.string().uuid(),
		});

		const {
			type,
			date,
			modality,
			observation,
			pickupsQuantity,
			deliveriesQuantity,
			totalWeightOfPickups,
			totalWeightOfDeliveries,
			freightAmountInCents,
			companyMemberId,
			driverId,
			vehicleId,
			routeId,
		} = registerFreightBodySchema.parse(req.body);

		try {
			const registerFreightUseCase = makeRegisterfreightUseCase();
			const { freight } = await registerFreightUseCase.execute({
				type,
				date,
				modality,
				observation,
				pickupsQuantity,
				deliveriesQuantity,
				totalWeightOfPickups,
				totalWeightOfDeliveries,
				freightAmountInCents,
				companyMemberId,
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
