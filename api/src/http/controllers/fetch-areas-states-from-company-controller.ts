import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchAreasStatesFromCompanyUseCase } from "@/use-cases/factories/make-fetch-areas-states-from-company-use-case";

export class FetchAreasStatesFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const userId = req.user.sub;

		try {
			const fetchStatesFromCompanyUseCase =
				makeFetchAreasStatesFromCompanyUseCase();
			const { states, areas } = await fetchStatesFromCompanyUseCase.execute({
				userId,
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
