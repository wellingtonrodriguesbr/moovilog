import { FastifyInstance } from "fastify";
import { registerCompanyController } from "../controllers/register-company-controller";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function companiesRoutes(app: FastifyInstance) {
  app.post("/companies", { onRequest: [verifyJWT] }, registerCompanyController);
}
