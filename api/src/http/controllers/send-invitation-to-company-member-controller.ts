import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyMemberAlreadyExistsError } from "@/use-cases/errors/company-member-already-exists-error";
import { makeSendInvitationToCompanyMemberUseCase } from "@/use-cases/factories/make-send-invitation-to-company-member-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";

import z from "zod";

export class SendInvitationToCompanyMemberController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const sendInvitationtoCompanyMemberBodySchema = z.object({
			name: z.string(),
			email: z.string().email(),
			sector: z.string(),
			companyMemberId: z.string().uuid(),
			role: z.enum([
				"ADMIN",
				"FINANCIAL",
				"OPERATIONAL",
				"MANAGER",
				"COMERCIAL",
			]),
		});

		const { name, email, sector, role, companyMemberId } =
			sendInvitationtoCompanyMemberBodySchema.parse(req.body);

		try {
			const sendInvitationtoCompanyMemberUseCase =
				makeSendInvitationToCompanyMemberUseCase();
			const { companyMember } =
				await sendInvitationtoCompanyMemberUseCase.execute({
					name,
					email,
					sector,
					role,
					companyMemberId,
				});

			reply.status(201).send({ companyMember });
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				reply.status(409).send({ message: error.message });
			}
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
}
