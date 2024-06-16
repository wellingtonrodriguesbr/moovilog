import { FastifyInstance } from "fastify";
import { registerDriverController } from "../controllers/register-driver-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { driverAuthenticateController } from "../controllers/driver-authenticate-controller";
import { driverRefreshController } from "../controllers/driver-refresh-token";

export async function driversRoutes(app: FastifyInstance) {
  app.post("/drivers", { onRequest: [verifyJWT] }, registerDriverController);
  app.post(
    "/drivers/sessions",
    { onRequest: [verifyJWT] },
    driverAuthenticateController
  );
  app.post("/drivers/token/refresh", driverRefreshController);
  app.post(
    "/drivers/bank-details",
    { onRequest: [verifyJWT] },
    registerDriverController
  );
}
