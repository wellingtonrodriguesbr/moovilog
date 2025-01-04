import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { RegisterDriverController } from "@/http/controllers/register-driver-controller";
import { FetchDriversByCompanyController } from "@/http/controllers/fetch-drivers-by-company-controller";

export async function driversRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/drivers", RegisterDriverController.handle);
	app.get("/:companyId/drivers", FetchDriversByCompanyController.handle);
}
