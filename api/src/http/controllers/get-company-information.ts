import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCompanyInformationUseCase } from "@/use-cases/factories/make-get-company-information-use-case";

export async function getCompanyInformationController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	const userId = req.user.sub;

	try {
		const getCompanyInformationUseCase = makeGetCompanyInformationUseCase();
		const { company, companyAddress } =
			await getCompanyInformationUseCase.execute({
				userId,
			});

		reply.status(200).send({ company, companyAddress });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
