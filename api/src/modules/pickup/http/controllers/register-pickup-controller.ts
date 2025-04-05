import { FastifyReply, FastifyRequest } from "fastify";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { makeRegisterPickupUseCase } from "@/modules/pickup/use-cases/factories/make-register-pickup-use-case";

import z from "zod";

export class RegisterPickupController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerPickupBodySchema = z.object({
			pickupNumber: z.string(),
			senderName: z.string(),
			recipientName: z.string(),
			weight: z.number(),
			volumeQuantity: z.number(),
			cubage: z.number(),
			priority: z.enum(["NORMAL", "URGENT"]),
			requestedAt: z.coerce.date(),
			scheduledDate: z.coerce.date(),
			cityName: z.string(),
			stateAcronym: z.enum([
				"AC",
				"AL",
				"AP",
				"AM",
				"BA",
				"CE",
				"DF",
				"ES",
				"GO",
				"MA",
				"MT",
				"MS",
				"MG",
				"PA",
				"PB",
				"PR",
				"PE",
				"PI",
				"RJ",
				"RN",
				"RS",
				"RO",
				"RR",
				"SC",
				"SP",
				"SE",
				"TO",
			]),
			addressZipCode: z.string(),
			addressStreet: z.string(),
			addressNeighborhood: z.string(),
			addressComplement: z.string().optional().nullable(),
			addressNumber: z.number(),
			companyId: z.string().uuid(),
			driverId: z.string().uuid(),
			vehicleId: z.string().uuid(),
		});

		const {
			pickupNumber,
			senderName,
			recipientName,
			weight,
			volumeQuantity,
			cubage,
			priority,
			requestedAt,
			scheduledDate,
			cityName,
			stateAcronym,
			addressZipCode,
			addressStreet,
			addressNumber,
			addressNeighborhood,
			addressComplement,
			companyId,
			driverId,
			vehicleId,
		} = registerPickupBodySchema.parse(req.body);

		const userId = req.user.sub;

		try {
			const registerPickupUseCase = makeRegisterPickupUseCase();
			const { pickup } = await registerPickupUseCase.execute({
				pickupNumber,
				senderName,
				recipientName,
				weight,
				volumeQuantity,
				cubage,
				priority,
				requestedAt,
				scheduledDate,
				cityName,
				stateAcronym,
				addressZipCode,
				addressStreet,
				addressNumber,
				addressNeighborhood,
				addressComplement,
				userId,
				driverId,
				vehicleId,
				companyId,
			});

			reply.status(201).send({ pickup });
		} catch (error) {
			if (error instanceof BadRequestError) {
				reply.status(400).send({ message: error.message });
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
