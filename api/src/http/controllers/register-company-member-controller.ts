import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyMemberAlreadyExistsError } from "@/use-cases/errors/company-member-already-exists-error";
import { makeRegisterCompanyMemberUseCase } from "@/use-cases/factories/make-register-company-member-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";

import z from "zod";

export async function registerCompanyMemberController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	const registerCompanyMemberBodySchema = z.object({
		memberId: z.string(),
		role: z.enum(["ADMIN", "FINANCIAL", "OPERATIONAL", "MEMBER"]),
	});

	const { memberId, role } = registerCompanyMemberBodySchema.parse(req.body);
	const creatorId = req.user.sub;

	try {
		const registerCompanyMemberUseCase = makeRegisterCompanyMemberUseCase();
		const { companyMemberId } = await registerCompanyMemberUseCase.execute({
			memberId,
			creatorId,
			role,
		});

		reply.status(201).send({ companyMemberId });
	} catch (error) {
		if (error instanceof CompanyMemberAlreadyExistsError) {
			reply.status(409).send({ message: error.message });
		}
		if (error instanceof NotAllowedError) {
			reply.status(403).send({ message: error.message });
		}
		if (error instanceof ResourceNotFoundError) {
			reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
