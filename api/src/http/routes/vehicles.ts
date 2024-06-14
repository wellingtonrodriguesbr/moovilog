import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerVehicleController } from "../controllers/register-vehicle-controller";

export async function vehiclesRoutes(app: FastifyInstance) {
  app.post("/vehicles", { onRequest: [verifyJWT] }, registerVehicleController);
}
