import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchCitiesByAreaController } from "@/http/controllers/fetch-cities-by-area-controller";

export async function citiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/:areaCode/cities", FetchCitiesByAreaController.handle);
}
