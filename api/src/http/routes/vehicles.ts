import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FetchVehiclesByCompanyController } from "@/http/controllers/fetch-vehicles-by-company-controller";

export async function vehiclesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/:companyId/vehicles", FetchVehiclesByCompanyController.handle);
}
