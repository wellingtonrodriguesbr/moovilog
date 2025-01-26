import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeFetchMembersFromCompanyUseCase } from "@/modules/company/use-cases/factories/make-fetch-members-from-company-use-case";

import z from "zod";

export class FetchMembersFromCompanyController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const fetchMembersInCompanyParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = fetchMembersInCompanyParamsSchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const fetchMembersInCompanyUseCase = makeFetchMembersFromCompanyUseCase();
			const { companyMembers } = await fetchMembersInCompanyUseCase.execute({
				companyId,
				userId,
			});

			reply.status(200).send({ companyMembers });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			throw error;
		}
	}
}
