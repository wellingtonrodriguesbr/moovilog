import { FastifyInstance } from "fastify";
import { registerCompanyController } from "../controllers/register-company-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCompanyMemberController } from "../controllers/register-company-member-controller";

export async function companiesRoutes(app: FastifyInstance) {
  app.post("/companies", { onRequest: [verifyJWT] }, registerCompanyController);
  app.post(
    "/companies/member/:memberId",
    { onRequest: [verifyJWT] },
    registerCompanyMemberController
  );
}
