import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchStatesAreasFromCompanyUseCase } from "@/modules/company/use-cases/factories/make-fetch-states-areas-from-company-use-case";
import z from "zod";

export class FetchStatesAreasFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchStatesAreasFromCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchStatesAreasFromCompanyParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const fetchStatesFromCompanyUseCase =
				makeFetchStatesAreasFromCompanyUseCase();
			const { states, areas } = await fetchStatesFromCompanyUseCase.execute({
				userId,
				companyId,
			});

			reply.status(200).send({ states, areas });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
