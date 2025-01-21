import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchCompanyRoutesUseCase } from "@/use-cases/factories/make-fetch-company-routes-use-case";

export class FetchCompanyRoutesController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const userId = req.user.sub;

		try {
			const fetchCompanyRoutesUseCase = makeFetchCompanyRoutesUseCase();
			const { routes } = await fetchCompanyRoutesUseCase.execute({
				userId,
			});

			reply.status(200).send({ routes });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
