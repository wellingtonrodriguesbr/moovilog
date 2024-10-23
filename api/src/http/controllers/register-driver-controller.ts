import { FastifyReply, FastifyRequest } from "fastify";
import { DriverAlreadyExistsError } from "@/use-cases/errors/driver-already-exists-error";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterDriverUseCase } from "@/use-cases/factories/make-register-driver-use-case";

import z from "zod";

export class RegisterDriverController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerDriverBodySchema = z.object({
			name: z.string(),
			documentNumber: z.string().min(11).max(11),
			companyMemberId: z.string().uuid(),
			phone: z.string().min(11).max(11),
			type: z.enum(["AGGREGATE", "FREELANCER", "INTERNAL"]),
		});

		const { name, documentNumber, phone, type, companyMemberId } =
			registerDriverBodySchema.parse(req.body);

		try {
			const registerDriverUseCase = makeRegisterDriverUseCase();
			const { driver } = await registerDriverUseCase.execute({
				name,
				documentNumber,
				phone,
				type,
				companyMemberId,
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
