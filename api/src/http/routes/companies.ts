import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCompanyMemberController } from "../controllers/register-company-member-controller";
import { registerCompanyAddressController } from "../controllers/register-company-address-controller";
import { fetchCompanyMembersController } from "../controllers/fetch-company-members-controller";
import { getCompanyInformationController } from "../controllers/get-company-information";
import { RegisterCompanyController } from "@/http/controllers/register-company-controller";

export async function companiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/companies", RegisterCompanyController.handle);
	app.post("/companies/address", registerCompanyAddressController);
	app.post("/companies/member", registerCompanyMemberController);
	app.get("/companies/information", getCompanyInformationController);
	app.get("/companies/members", fetchCompanyMembersController);
}
