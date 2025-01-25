import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterRouteController } from "@/modules/route/http/controllers/register-route-controller";

export async function routeModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/routes", RegisterRouteController.handle);
	// app.get("/company/routes", FetchCompanyRoutesController.handle);
	// app.get("/routes/:routeId/cities", FetchCitiesInRouteController.handle);
}
