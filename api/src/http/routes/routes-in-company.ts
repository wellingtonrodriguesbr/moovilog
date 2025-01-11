import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterRouteController } from "@/http/controllers/register-route-controller";

export async function routesInCompanyRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/routes", RegisterRouteController.handle);
}
