import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";

import { RegisterDriverController } from "@/modules/driver/http/controllers/register-driver-controller";
import { FetchDriversFromCompanyController } from "@/modules/driver/http/controllers/fetch-drivers-from-company-controller";
import { UpdateDriverStatusController } from "@/modules/driver/http/controllers/update-driver-status-controller";
import { UpdateDriverController } from "@/modules/driver/http/controllers/update-driver-controller";

export async function driverModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/drivers", RegisterDriverController.handle);
	app.get(
		"/companies/:companyId/drivers",
		FetchDriversFromCompanyController.handle
	);
	app.patch("/drivers/:driverId/status", UpdateDriverStatusController.handle);
	app.put("/drivers/:driverId", UpdateDriverController.handle);
}
