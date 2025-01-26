import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchDriversFromCompanyUseCase } from "@/modules/company/use-cases/factories/make-fetch-drivers-from-company-use-case";

import z from "zod";

export class FetchDriversFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchDriversInCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchDriversInCompanyParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchDriversInCompanyUseCase = makeFetchDriversFromCompanyUseCase();
			const { drivers } = await fetchDriversInCompanyUseCase.execute({
				companyId,
				userId,
			});

			reply.status(200).send({ drivers });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
