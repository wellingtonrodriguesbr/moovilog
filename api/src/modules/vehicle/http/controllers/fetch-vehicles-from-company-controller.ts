import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchVehiclesFromCompanyUseCase } from "@/modules/vehicle/use-cases/factories/make-fetch-vehicles-from-company-use-case";

import z from "zod";

export class FetchVehiclesFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchVehiclesFromCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchVehiclesFromCompanyParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const FetchVehiclesFromCompanyUseCase =
				makeFetchVehiclesFromCompanyUseCase();
			const { vehicles } = await FetchVehiclesFromCompanyUseCase.execute({
				companyId,
				userId,
			});

			reply.status(200).send({ vehicles });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
