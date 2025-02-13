import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { FetchTransactionsFromCompanyController } from "@/modules/financial/http/controllers/fetch-transactions-from-company-controller";

export async function financialModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get(
		"/companies/:companyId/transactions",
		FetchTransactionsFromCompanyController.handle
	);
}
