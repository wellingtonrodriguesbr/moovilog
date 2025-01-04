import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchDriversByCompanyUseCase } from "@/use-cases/factories/make-fetch-drivers-by-company-use-case";

import z from "zod";

export class FetchDriversByCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchDriversByCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchDriversByCompanyParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchDriversByCompanyUseCase = makeFetchDriversByCompanyUseCase();
			const { drivers } = await fetchDriversByCompanyUseCase.execute({
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
