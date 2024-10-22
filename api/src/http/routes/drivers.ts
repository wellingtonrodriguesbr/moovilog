import { FastifyInstance } from "fastify";
import { registerDriverController } from "../controllers/register-driver-controller";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function driversRoutes(app: FastifyInstance) {
	app.post("/drivers", { onRequest: [verifyJWT] }, registerDriverController);
}
