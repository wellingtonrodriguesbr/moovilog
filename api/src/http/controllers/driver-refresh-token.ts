import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";

import dayjs from "dayjs";

export async function driverRefreshController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	await req.jwtVerify({ onlyCookie: true });

	try {
		const token = await reply.jwtSign(
			{
				documentNumber: req.user.documentNumber,
			},
			{
				sign: {
					sub: req.user.sub,
					expiresIn: "10m",
				},
			}
		);

		const refreshToken = await reply.jwtSign(
			{
				documentNumber: req.user.documentNumber,
			},
			{
				sign: {
					sub: req.user.sub,
				},
			}
		);

		return reply
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
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
