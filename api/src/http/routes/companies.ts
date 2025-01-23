import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { FetchAreasStatesFromCompanyController } from "@/http/controllers/fetch-areas-states-from-company-controller";

export async function companiesRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get(
		"/companies/:companyId/areas-states",
		FetchAreasStatesFromCompanyController.handle
	);
}
