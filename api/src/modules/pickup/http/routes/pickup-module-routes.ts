import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterPickupController } from "@/modules/pickup/http/controllers/register-pickup-controller";

export async function pickupModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/pickups", RegisterPickupController.handle);
}
