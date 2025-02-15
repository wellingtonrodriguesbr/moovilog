import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchCategoriesUseCase } from "@/modules/financial/use-cases/factories/make-fetch-categories-use-case";

export class FetchCategoriesController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		try {
			const fetchCategoriesUseCase = makeFetchCategoriesUseCase();
			const { categories } = await fetchCategoriesUseCase.execute();

			reply.status(200).send({ categories });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
