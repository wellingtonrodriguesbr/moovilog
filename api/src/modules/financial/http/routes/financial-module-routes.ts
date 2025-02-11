import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";

export async function financialModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);
}
