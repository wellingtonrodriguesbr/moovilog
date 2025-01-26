import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchCitiesInRouteController } from "@/modules/shared/http/controllers/fetch-cities-in-route-controller";

export async function routesInCompanyRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/routes/:routeId/cities", FetchCitiesInRouteController.handle);
}
