import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeGetCompanyInformationUseCase } from "@/modules/company/use-cases/factories/make-get-company-information-use-case";

export class GetCompanyInformationController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
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
}
