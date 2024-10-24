import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterVehicleController } from "@/http/controllers/register-vehicle-controller";

export async function vehiclesRoutes(app: FastifyInstance) {
	app.post(
		"/vehicles",
		{ onRequest: [verifyJWT] },
		RegisterVehicleController.handle
	);
}
