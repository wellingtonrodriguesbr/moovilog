import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeUpdateDriverStatusUseCase } from "@/modules/driver/use-cases/factories/make-update-driver-status-use-case";

import z from "zod";

export class UpdateDriverStatusController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const updateDriverStatusBodySchema = z.object({
			status: z.enum(["ACTIVE", "INACTIVE"]),
		});

		const updateDriverStatusParamsSchema = z.object({
			driverId: z.string().uuid(),
		});

		const { driverId } = updateDriverStatusParamsSchema.parse(req.params);
		const { status } = updateDriverStatusBodySchema.parse(req.body);

		const userId = req.user.sub;

		try {
			const updateDriverStatusUseCase = makeUpdateDriverStatusUseCase();
			await updateDriverStatusUseCase.execute({
				driverId,
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
