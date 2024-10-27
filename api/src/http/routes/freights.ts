import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterFreightController } from "@/http/controllers/register-freight-controller";

export async function freightsRoutes(app: FastifyInstance) {
	app.post(
		"/freights",
		{ onRequest: [verifyJWT] },
		RegisterFreightController.handle
	);
}
