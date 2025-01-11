import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { GetCitiesByAreaController } from "@/http/controllers/get-cities-by-area-controller";

export async function citiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/:areaId/cities", GetCitiesByAreaController.handle);
}
