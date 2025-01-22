import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterCompanyController } from "@/modules/company/http/controllers/register-company-controller";

export async function companyModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/companies", RegisterCompanyController.handle);
	// app.post("/companies/address", RegisterCompanyAddressController.handle);
	// app.post(
	// 	"/companies/:companyId/areas-states",
	// 	RegisterCompanyAreaServiceController.handle
	// );
	// app.get(
	// 	"/companies/:companyId/areas-states",
	// 	FetchAreasStatesFromCompanyController.handle
	// );
	// app.get("/companies/information", GetCompanyInformationController.handle);
}
