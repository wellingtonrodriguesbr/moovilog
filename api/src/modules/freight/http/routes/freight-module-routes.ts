import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterFreightController } from "@/modules/freight/http/controllers/register-freight-controller";

export async function freightModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/freights", RegisterFreightController.handle);
}
