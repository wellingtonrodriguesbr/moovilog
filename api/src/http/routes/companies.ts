import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { RegisterCompanyController } from "@/http/controllers/register-company-controller";
import { RegisterCompanyAddressController } from "@/http/controllers/register-company-address-controller";
import { GetCompanyInformationController } from "@/http/controllers/get-company-information";

export async function companiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/companies", RegisterCompanyController.handle);
	app.post("/companies/address", RegisterCompanyAddressController.handle);
	app.get("/companies/information", GetCompanyInformationController.handle);
}
