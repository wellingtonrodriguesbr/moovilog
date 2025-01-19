import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchStatesFromCompanyUseCase } from "@/use-cases/factories/make-fetch-states-from-company-use-case";

export class FetchStatesFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const userId = req.user.sub;

		try {
			const fetchStatesFromCompanyUseCase = makeFetchStatesFromCompanyUseCase();
			const { states } = await fetchStatesFromCompanyUseCase.execute({
				userId,
			});

			reply.status(200).send({ states });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
