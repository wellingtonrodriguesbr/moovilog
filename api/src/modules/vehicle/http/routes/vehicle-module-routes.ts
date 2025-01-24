import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterVehicleController } from "@/modules/vehicle/http/controllers/register-vehicle-controller";

export async function vehicleModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/vehicles", RegisterVehicleController.handle);
	// app.get("/:companyId/vehicles", FetchVehiclesByCompanyController.handle);
}
