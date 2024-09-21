import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerFreightController } from "../controllers/register-freight-controller";

export async function freightsRoutes(app: FastifyInstance) {
	app.post("/freights", { onRequest: [verifyJWT] }, registerFreightController);
}
