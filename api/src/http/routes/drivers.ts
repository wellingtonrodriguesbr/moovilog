import { FastifyInstance } from "fastify";
import { RegisterDriverController } from "../controllers/register-driver-controller";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function driversRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/:companyId/drivers", RegisterDriverController.handle);
}
