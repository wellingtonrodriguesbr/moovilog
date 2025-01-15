import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchAreasByStatesController } from "@/http/controllers/fetch-areas-by-states-controller";

export async function areasRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/areas", FetchAreasByStatesController.handle);
}
