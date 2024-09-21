import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterDriverBankDetailsUseCase } from "@/use-cases/factories/make-register-driver-bank-details-use-case";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";

import z from "zod";

export async function registerDriverBankDetailsController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const registerDriverBankDetailsBodySchema = z.object({
		financialInstitution: z.string(),
		accountType: z.enum([
			"CURRENT_ACCOUNT",
			"SALARY_ACCOUNT",
			"SAVINGS_ACCOUNT",
		]),
		agency: z.number(),
		accountNumber: z.string(),
		pixKey: z.string().optional().nullable(),
		driverId: z.string(),
	});

	const creatorId = req.user.sub;

	const {
		financialInstitution,
		accountType,
		accountNumber,
		agency,
		pixKey,
		driverId,
	} = registerDriverBankDetailsBodySchema.parse(req.body);

	try {
		const registerDriverBankDetailsUseCase =
      makeRegisterDriverBankDetailsUseCase();
		const { bankDetailsId } = await registerDriverBankDetailsUseCase.execute({
			financialInstitution,
			accountType,
			accountNumber,
			agency,
			pixKey,
			driverId,
			creatorId,
		});

		reply.status(201).send({ bankDetailsId });
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
