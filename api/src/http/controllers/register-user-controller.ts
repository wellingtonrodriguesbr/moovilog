import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-user-use-case";

import z from "zod";

export class RegisterUserController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const registerUserBodySchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(8),
			phone: z.string().min(11),
		});

		const { name, email, password, phone } = registerUserBodySchema.parse(
			req.body
		);

		try {
			const registerUserUseCase = makeRegisterUserUseCase();
			const { userId } = await registerUserUseCase.execute({
				name,
				email,
				password,
				phone,
			});

			reply.status(201).send({ userId });
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				reply.status(409).send({ message: error.message });
			}

			throw error;
		}
	}
}
