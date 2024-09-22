import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

import dayjs from "dayjs";
import z from "zod";

export async function authenticateController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{
				email: user.email,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: "10m",
				},
			}
		);

		const refreshToken = await reply.jwtSign(
			{
				email: user.email,
			},
			{
				sign: {
					sub: user.id,
				},
			}
		);

		reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				domain: process.env.COOKIES_DOMAIN,
				sameSite: true,
				httpOnly: true,
				expires: dayjs().add(7, "day").toDate(),
			})
			.status(200)
			.send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			reply.status(401).send({ message: error.message });
		}

		throw error;
	}
}
