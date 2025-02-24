import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { MemberAlreadyExistsInCompanyError } from "@/modules/company-member/use-cases/errors/member-already-exists-in-company";
import { makeSendInvitationToCompanyMemberUseCase } from "@/modules/company-member/use-cases/factories/make-send-invitation-to-company-member-use-case";

import z from "zod";

export class SendInvitationToCompanyMemberController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const sendInvitationtoCompanyMemberBodySchema = z.object({
			name: z.string(),
			email: z.string().email(),
			sector: z.string(),
			permissions: z.string().array(),
		});

		const sendInvitationtoCompanyMemberParamsSchema = z.object({
			companyId: z.string().uuid(),
		});

		const { companyId } = sendInvitationtoCompanyMemberParamsSchema.parse(
			req.params
		);

		const { name, email, sector, permissions } =
			sendInvitationtoCompanyMemberBodySchema.parse(req.body);

		const senderId = req.user.sub;

		try {
			const sendInvitationtoCompanyMemberUseCase =
				makeSendInvitationToCompanyMemberUseCase();
			const { companyMember } =
				await sendInvitationtoCompanyMemberUseCase.execute({
					name,
					email,
					sector,
					permissions,
					senderId,
					companyId,
				});

			reply.status(201).send({ companyMember });
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				reply.status(409).send({ message: error.message });
			}
			if (error instanceof MemberAlreadyExistsInCompanyError) {
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
