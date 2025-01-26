import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterVehicleController } from "@/modules/vehicle/http/controllers/register-vehicle-controller";
import { FetchVehiclesFromCompanyController } from "@/modules/vehicle/http/controllers/fetch-vehicles-from-company-controller";

export async function vehicleModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/vehicles", RegisterVehicleController.handle);
	app.get("/:companyId/vehicles", FetchVehiclesFromCompanyController.handle);
}
