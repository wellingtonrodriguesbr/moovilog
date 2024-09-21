import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchCompanyMembersUseCase } from "@/use-cases/factories/make-fetch-company-members-use-case";

export async function fetchCompanyMembersController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = req.user.sub;

	try {
		const fetchCompanyMembersUseCase = makeFetchCompanyMembersUseCase();
		const { companyMembers } = await fetchCompanyMembersUseCase.execute({
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
