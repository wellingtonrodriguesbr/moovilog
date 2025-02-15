import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeGetFinancialSummaryFromCompanyUseCase } from "@/modules/financial/use-cases/factories/make-get-financial-summary-from-company-use-case";

import z from "zod";

export class GetFinancialSummaryFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const getFinancialSummaryFromCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = getFinancialSummaryFromCompanyParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const getFinancialSummaryFromCompanyUseCase =
				makeGetFinancialSummaryFromCompanyUseCase();
			const {
				totalTransactions,
				totalIncomeInCents,
				totalExpenseInCents,
				summary,
				percentage,
			} = await getFinancialSummaryFromCompanyUseCase.execute({
				companyId,
				userId,
			});

			reply.status(200).send({
				totalTransactions,
				totalIncomeInCents,
				totalExpenseInCents,
				summary,
				percentage,
			});
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
