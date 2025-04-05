import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { makeGetCompanyInformationUseCase } from "@/modules/company/use-cases/factories/make-get-company-information-use-case";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

export class GetCompanyInformationController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const userId = req.user.sub;

		try {
			const getCompanyInformationUseCase = makeGetCompanyInformationUseCase();
			const { company } = await getCompanyInformationUseCase.execute({
				userId,
			});

			reply.status(200).send({ company });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}
			if (error instanceof BadRequestError) {
				reply.status(400).send({ message: error.message });
			}

			throw error;
		}
	}
}
