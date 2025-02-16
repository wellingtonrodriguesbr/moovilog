import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeGetFreightsSummaryFromCompanyUseCase } from "@/modules/freight/use-cases/factories/make-get-freights-summary-from-company-use-case";

import z from "zod";

export class GetFreightsSummaryFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const getFreightsSummaryFromCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = getFreightsSummaryFromCompanyParamsSchema.parse(
			req.params
		);

		const userId = req.user.sub;

		try {
			const getFreightsSummaryFromCompanyUseCase =
				makeGetFreightsSummaryFromCompanyUseCase();
			const { summary } = await getFreightsSummaryFromCompanyUseCase.execute({
				userId,
				companyId,
			});

			reply.status(200).send({ summary });
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
