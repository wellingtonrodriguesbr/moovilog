import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { RegisterFreightController } from "@/modules/freight/http/controllers/register-freight-controller";
import { FetchFreightsFromCompanyController } from "@/modules/freight/http/controllers/fetch-freights-from-company-controller";
import { GetFreightDetailsController } from "@/modules/freight/http/controllers/get-freight-details-controller";

export async function freightModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/freights", RegisterFreightController.handle);
	app.get("/:companyId/freights", FetchFreightsFromCompanyController.handle);
	app.get(
		"/:companyId/freights/:freightId/details",
		GetFreightDetailsController.handle
	);
}
