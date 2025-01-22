import { UnauthorizedError } from "@/modules/shared/errors/unauthorized-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class LogoutController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		try {
			await req.jwtVerify({ onlyCookie: true });

			reply.clearCookie("refreshToken", {
				path: "/",
				domain: process.env.COOKIES_DOMAIN,
			});

			return reply.send({ success: true });
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				return reply.status(401).send({ message: error.message });
			} else {
				return reply.status(500).send({ message: "Internal server error" });
			}
		}
	}
}
