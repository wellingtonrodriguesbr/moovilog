import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchVehiclesByCompanyUseCase } from "@/use-cases/factories/make-fetch-vehicles-by-company-use-case";

import z from "zod";

export class FetchVehiclesByCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchVehiclesByCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchVehiclesByCompanyParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchVehiclesByCompanyUseCase = makeFetchVehiclesByCompanyUseCase();
			const { vehicles } = await fetchVehiclesByCompanyUseCase.execute({
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
