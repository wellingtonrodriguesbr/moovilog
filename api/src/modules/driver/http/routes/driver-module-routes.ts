import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";

import { RegisterDriverController } from "@/modules/driver/http/controllers/register-driver-controller";
import { FetchDriversFromCompanyController } from "@/modules/driver/http/controllers/fetch-drivers-from-company-controller";
import { DeleteDriverController } from "@/modules/driver/http/controllers/delete-driver-controller";

export async function driverModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/drivers", RegisterDriverController.handle);
	app.get(
		"/companies/:companyId/drivers",
		FetchDriversFromCompanyController.handle
	);
	app.patch("/:companyId/drivers/:driverId", DeleteDriverController.handle);
}
