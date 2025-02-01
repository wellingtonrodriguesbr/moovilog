import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterRouteController } from "@/modules/route/http/controllers/register-route-controller";
import { FetchRoutesFromCompanyController } from "@/modules/route/http/controllers/fetch-routes-from-company-controller";
import { FetchCitiesFromRouteController } from "@/modules/route/http/controllers/fetch-cities-from-route-controller";

export async function routeModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/routes", RegisterRouteController.handle);
	app.get(
		"/companies/:companyId/routes",
		FetchRoutesFromCompanyController.handle
	);
	app.get("/routes/:routeId/cities", FetchCitiesFromRouteController.handle);
}
