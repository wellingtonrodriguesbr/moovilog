import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";

import { RegisterCompanyController } from "@/modules/company/http/controllers/register-company-controller";
import { RegisterCompanyAddressController } from "@/modules/company/http/controllers/register-company-address-controller";
import { GetCompanyInformationController } from "@/modules/company/http/controllers/get-company-information-controller";
import { GetCompanyAddressController } from "@/modules/company/http/controllers/get-company-address-controller";

export async function companyModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/companies", RegisterCompanyController.handle);
	app.post("/companies/address", RegisterCompanyAddressController.handle);

	app.get("/companies/information", GetCompanyInformationController.handle);
	app.get("/companies/:companyId/address", GetCompanyAddressController.handle);
}
