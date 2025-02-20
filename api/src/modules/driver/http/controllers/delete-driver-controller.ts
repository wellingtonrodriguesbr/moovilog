import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeDeleteDriverUseCase } from "@/modules/driver/use-cases/factories/make-delete-driver-use-case";

import z from "zod";

export class DeleteDriverController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const deleteDriverParamsSchema = z.object({
			companyId: z.string().uuid(),
			driverId: z.string().uuid(),
		});

		const { companyId, driverId } = deleteDriverParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const deleteDriverUseCase = makeDeleteDriverUseCase();
			await deleteDriverUseCase.execute({
				driverId,
				userId,
				companyId,
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
