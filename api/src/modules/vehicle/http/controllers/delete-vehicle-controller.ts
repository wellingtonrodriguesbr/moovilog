import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeDeleteVehicleUseCase } from "@/modules/vehicle/use-cases/factories/make-delete-vehicle-use-case";

import z from "zod";

export class DeleteVehicleController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const deleteVehicleParamsSchema = z.object({
			companyId: z.string().uuid(),
			vehicleId: z.string().uuid(),
		});

		const { companyId, vehicleId } = deleteVehicleParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const deleteVehicleUseCase = makeDeleteVehicleUseCase();
			await deleteVehicleUseCase.execute({
				vehicleId,
				companyId,
				userId,
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
