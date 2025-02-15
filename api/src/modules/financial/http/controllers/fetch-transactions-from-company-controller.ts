import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeFetchTransactionsFromCompanyUseCase } from "@/modules/financial/use-cases/factories/make-fetch-transactions-from-company-use-case";

import z from "zod";

export class FetchTransactionsFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchTransactionsFromCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchTransactionsFromCompanyParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const fetchTransactionsFromCompanyUseCase =
				makeFetchTransactionsFromCompanyUseCase();
			const { transactions } =
				await fetchTransactionsFromCompanyUseCase.execute({
					companyId,
					userId,
				});

			reply.status(200).send({ transactions });
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
