import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCompanyAddressController } from "../controllers/register-company-address-controller";
import { getCompanyInformationController } from "../controllers/get-company-information";
import { RegisterCompanyController } from "@/http/controllers/register-company-controller";
import { FetchCompanyMembersController } from "@/http/controllers/fetch-company-members-controller";

export async function companiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/companies", RegisterCompanyController.handle);
	app.post("/companies/address", registerCompanyAddressController);
	app.get("/companies/information", getCompanyInformationController);
	app.get("/company/members", FetchCompanyMembersController.handle);
}
