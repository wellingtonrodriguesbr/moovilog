import { FastifyReply, FastifyRequest } from "fastify";
import { DriverAlreadyExistsError } from "@/modules/driver/use-cases/errors/driver-already-exists-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeRegisterDriverUseCase } from "@/modules/driver/use-cases/factories/make-register-driver-use-case";

import z from "zod";

export class RegisterDriverController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerDriverBodySchema = z.object({
			name: z.string(),
			documentNumber: z.string().min(11).max(11),
			phone: z.string().min(11).max(11),
			type: z.enum(["AGGREGATE", "FREELANCER", "INTERNAL"]),
		});

		const creatorId = req.user.sub;

		const { name, documentNumber, phone, type } =
			registerDriverBodySchema.parse(req.body);

		try {
			const registerDriverUseCase = makeRegisterDriverUseCase();
			const { driver } = await registerDriverUseCase.execute({
				name,
				documentNumber,
				phone,
				type,
				creatorId,
			});

			reply.status(201).send({ driverId: driver.id });
		} catch (error) {
			if (error instanceof DriverAlreadyExistsError) {
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
