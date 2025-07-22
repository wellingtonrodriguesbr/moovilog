import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterVehicleController } from "@/modules/vehicle/http/controllers/register-vehicle-controller";
import { FetchVehiclesFromCompanyController } from "@/modules/vehicle/http/controllers/fetch-vehicles-from-company-controller";
import { UpdateVehicleStatusController } from "@/modules/vehicle/http/controllers/update-vehicle-status-controller";
import { UpdateVehicleController } from "@/modules/vehicle/http/controllers/update-vehicle-controller";

export async function vehicleModuleRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/vehicles", RegisterVehicleController.handle);
  app.get("/companies/:companyId/vehicles", FetchVehiclesFromCompanyController.handle);
  app.patch("/vehicles/:vehicleId/status", UpdateVehicleStatusController.handle);
  app.put("/vehicles/:vehicleId", UpdateVehicleController.handle);
}
