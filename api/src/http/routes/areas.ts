import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchAreasByStateController } from "@/http/controllers/fetch-areas-by-state-controller";

export async function areasRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/:stateAcronym/areas", FetchAreasByStateController.handle);
}
