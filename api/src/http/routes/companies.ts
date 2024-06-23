import { FastifyInstance } from "fastify";
import { registerCompanyController } from "../controllers/register-company-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCompanyMemberController } from "../controllers/register-company-member-controller";
import { fetchFreightsController } from "../controllers/fetch-freights-controller";
import { registerCompanyAddressController } from "../controllers/register-company-address-controller";
import { fetchCompanyMembersController } from "../controllers/fetch-company-members-controller";
import { getCompanyInformationController } from "../controllers/get-company-information";

export async function companiesRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/companies", registerCompanyController);
  app.post("/companies/address", registerCompanyAddressController);
  app.post("/companies/member", registerCompanyMemberController);
  app.get("/companies/information", getCompanyInformationController);
  app.get("/companies/members", fetchCompanyMembersController);
  app.get("/companies/freights", fetchFreightsController);
}
