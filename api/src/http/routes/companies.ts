import { FastifyInstance } from "fastify";
import { registerCompanyController } from "../controllers/register-company-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCompanyMemberController } from "../controllers/register-company-member-controller";
import { fetchFreightsController } from "../controllers/fetch-freights-controller";
import { registerCompanyAddressController } from "../controllers/register-company-address-controller";

export async function companiesRoutes(app: FastifyInstance) {
  app.post("/companies", { onRequest: [verifyJWT] }, registerCompanyController);
  app.post(
    "/companies/address",
    { onRequest: [verifyJWT] },
    registerCompanyAddressController
  );
  app.post(
    "/companies/member",
    { onRequest: [verifyJWT] },
    registerCompanyMemberController
  );
  app.get(
    "/companies/freights",
    { onRequest: [verifyJWT] },
    fetchFreightsController
  );
}
