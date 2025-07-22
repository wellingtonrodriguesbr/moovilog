import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { FetchTransactionsFromCompanyController } from "@/modules/financial/http/controllers/fetch-transactions-from-company-controller";
import { RegisterTransactionController } from "@/modules/financial/http/controllers/register-transaction-controller";
import { FetchCategoriesController } from "@/modules/financial/http/controllers/fetch-categories-controller";

export async function financialModuleRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/companies/:companyId/transactions", FetchTransactionsFromCompanyController.handle);
  app.post("/companies/:companyId/transactions", RegisterTransactionController.handle);

  app.get("/transactions/categories", FetchCategoriesController.handle);
}
