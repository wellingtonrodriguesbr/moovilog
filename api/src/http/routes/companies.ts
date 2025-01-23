import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { GetCompanyInformationController } from "@/http/controllers/get-company-information-controller";
import { RegisterCompanyAreaServiceController } from "@/http/controllers/register-company-area-service-controller";
import { FetchAreasStatesFromCompanyController } from "@/http/controllers/fetch-areas-states-from-company-controller";

export async function companiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post(
		"/companies/:companyId/areas-states",
		RegisterCompanyAreaServiceController.handle
	);
	app.get(
		"/companies/:companyId/areas-states",
		FetchAreasStatesFromCompanyController.handle
	);
	app.get("/companies/information", GetCompanyInformationController.handle);
}
