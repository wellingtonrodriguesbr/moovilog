import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchCompanyRoutesController } from "@/http/controllers/fetch-company-routes-controller";
import { FetchCitiesInRouteController } from "@/http/controllers/fetch-cities-in-route-controller";

export async function routesInCompanyRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/company/routes", FetchCompanyRoutesController.handle);
	app.get("/routes/:routeId/cities", FetchCitiesInRouteController.handle);
}
