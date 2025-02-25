import { FastifyReply, FastifyRequest } from "fastify";
import { DriverAlreadyExistsError } from "@/modules/driver/use-cases/errors/driver-already-exists-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeUpdateDriverUseCase } from "@/modules/driver/use-cases/factories/make-update-driver-use-case";

import z from "zod";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

export class UpdateDriverController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const updateDriverParamsSchema = z.object({
			driverId: z.string().uuid(),
		});

		const updateDriverBodySchema = z.object({
			name: z.string().optional(),
			documentNumber: z.string().min(11).max(11).optional(),
			phone: z.string().min(11).max(11).optional(),
			type: z.enum(["AGGREGATE", "FREELANCER", "INTERNAL"]).optional(),
		});

		const userId = req.user.sub;

		const { driverId } = updateDriverParamsSchema.parse(req.params);
		const { name, documentNumber, phone, type } = updateDriverBodySchema.parse(
			req.body
		);

		try {
			const updateDriverUseCase = makeUpdateDriverUseCase();
			await updateDriverUseCase.execute({
				name,
				documentNumber,
				phone,
				type,
				userId,
				driverId,
			});

			reply.status(204).send();
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
			if (error instanceof BadRequestError) {
				reply.status(400).send({ message: error.message });
			}

			throw error;
		}
	}
}
