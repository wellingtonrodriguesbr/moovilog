import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";

import { RegisterDriverController } from "@/modules/driver/http/controllers/register-driver-controller";

export async function driverModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/drivers", RegisterDriverController.handle);
	// app.get("/:companyId/drivers", FetchDriversByCompanyController.handle);
}
